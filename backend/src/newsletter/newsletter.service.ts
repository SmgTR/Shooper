import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Newsletter } from 'src/entities/newsletter.entity';
import { getMongoRepository, Repository } from 'typeorm';

import { UserService } from 'src/user/user.service';
import { MailService } from 'src/mail/mail.service';
import { JwtService } from '@nestjs/jwt';

import jwtDecode from 'jwt-decode';

import { EmailPayload } from './newsletter.type';

import { VerificationTokenPayload } from './jwt/newsletter-payload.interface';
import { errorHandler } from 'src/utils/errorHandler';

@Injectable()
export class NewsletterService {
  constructor(
    @InjectRepository(Newsletter)
    private newsletterRepository: Repository<Newsletter>,
    private userService: UserService,
    private mailService: MailService,
    private jwtService: JwtService,
  ) {}

  async SubscribeNewsletter(token) {
    const payload: EmailPayload = await jwtDecode(token);

    const { email, name } = payload;
    const userExist = await this.userService.UserNewsletter(email, 'ADD');
    if (userExist.length > 0) {
      const output = {
        email: userExist[0].email,
        createdAt: userExist[0].createdAt,
      };

      return output;
    } else {
      const duplicate = await this.newsletterRepository.find({
        where: { email: email },
      });

      if (duplicate.length > 0) {
        errorHandler(
          'Something went wrong, cannot add email to newsletter list',
          '503',
        );
      }
      const newSubscriber = this.newsletterRepository.create({
        email,
        name,
        createdAt: new Date(),
      });
      this.newsletterRepository.save(newSubscriber);
      return newSubscriber;
    }
  }

  async ConfirmSubscriberMail(userInfo) {
    const payload: VerificationTokenPayload = userInfo;
    const token = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: 3600,
    });

    const { email, name } = userInfo;

    const confirmTokenUrl = `${process.env.APP_ADDRESS}/newsletter&token=${token}`;

    const content = {
      link: confirmTokenUrl,
      subject: 'Please confirm your email',
      name: name,
    };

    return this.mailService.NewsletterConfirmEmail(email, content);
  }

  async DeleteFromNewsletterList(email) {
    const userExist = await this.userService.UserNewsletter(email, 'REMOVE');
    if (userExist.length > 0) {
      const output = {
        email: userExist[0].email,
        createdAt: userExist[0].createdAt,
      };
      return output;
    } else {
      const item = this.newsletterRepository.find(email);
      const repo = getMongoRepository(Newsletter);
      repo.deleteOne(item);
      return email;
    }
  }

  async SendMailToAllSubscribers(content) {
    const registredSubscribers = await this.userService.FindUsers({
      newsletter: true,
    });
    const notRegistredSubscribers = await this.newsletterRepository.find();

    const allSubscribers = [
      ...registredSubscribers,
      ...notRegistredSubscribers,
    ];

    allSubscribers.forEach((subscriber) => {
      this.mailService.SendNewsletterMail(subscriber.email, content);
    });

    return;
  }
}
