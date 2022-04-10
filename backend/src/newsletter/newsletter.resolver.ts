import { NewsletterType } from './newsletter.type';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { NewsletterService } from './newsletter.service';
import { NewsletterContent } from './newsletter.input';
import { Roles } from 'src/decorators/role-user.decorator';
import { UseGuards } from '@nestjs/common';
import { UserStatus } from 'src/staff/staff.type';
import { GqlAuthGuard } from 'src/guards/gql-auth.guard';
import { RolesGuard } from 'src/guards/role-auth.guard';
import { NewsletterCheck } from 'src/decorators/newsletter.decorator';

@Resolver((of) => NewsletterType)
export class NewsletterResolver {
  constructor(private newsletterService: NewsletterService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation((returns) => NewsletterType)
  async addSubscriber(@NewsletterCheck() token: string) {
    return this.newsletterService.SubscribeNewsletter(token);
  }

  @Mutation((returns) => NewsletterType)
  async sendConfirmMail(
    @Args('email') email: string,
    @Args('name') name: string,
  ) {
    const userInfo = {
      email,
      name,
    };
    return this.newsletterService.ConfirmSubscriberMail(userInfo);
  }

  @Mutation((returns) => NewsletterType)
  async removeSubscriber(@Args('email') email: string) {
    return this.newsletterService.DeleteFromNewsletterList(email);
  }

  @Roles(UserStatus.ADMIN, UserStatus.MODERATOR)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Mutation((returns) => NewsletterType)
  async sendToAllSubscribers(
    @Args('newsletterContent') newsletterContent: NewsletterContent,
  ) {
    return this.newsletterService.SendMailToAllSubscribers(newsletterContent);
  }
}
