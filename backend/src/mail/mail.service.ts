import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async SendWelcomeMail(mail: string, name: string) {
    await this.mailerService.sendMail({
      to: mail,
      subject: 'Fonk You',
      template: './welcome',
      context: {
        name,
      },
      attachments: [
        {
          filename: 'logo.png',
          path: __dirname + '/templates/images/logo.png',
          cid: 'logo',
        },
      ],
    });
  }

  async NewsletterConfirmEmail(mail, content) {
    await this.mailerService.sendMail({
      to: mail,
      subject: content.subject,
      template: './newsletterConfirm',
      context: {
        content,
      },
      attachments: [
        {
          filename: 'logo.png',
          path: __dirname + '/templates/images/logo.png',
          cid: 'logo',
        },
      ],
    });
  }

  async SendNewsletterMail(mail, content) {
    await this.mailerService.sendMail({
      to: mail,
      subject: content.subject,
      template: './newsletter',
      context: {
        content,
      },
      attachments: [
        {
          filename: 'logo.png',
          path: __dirname + '/templates/images/logo.png',
          cid: 'logo',
        },
      ],
    });
  }
}
