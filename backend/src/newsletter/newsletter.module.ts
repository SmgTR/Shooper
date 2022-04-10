import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailModule } from 'src/mail/mail.module';
import { UserModule } from 'src/user/user.module';

import { Newsletter } from '../entities/newsletter.entity';

import { NewsletterResolver } from './newsletter.resolver';
import { NewsletterService } from './newsletter.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Newsletter]),
    forwardRef(() => UserModule),
    forwardRef(() => MailModule),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: 3600,
      },
    }),
  ],
  providers: [NewsletterResolver, NewsletterService],
})
export class NewsletterModule {}
