import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, MinLength } from 'class-validator';

@InputType()
export class CreateSubscriberInput {
  @MinLength(1)
  @IsEmail()
  @Field()
  email: string;
}

@InputType()
export class NewsletterContent {
  @MinLength(1)
  @Field()
  subject: string;
  @Field()
  message: string;
}
