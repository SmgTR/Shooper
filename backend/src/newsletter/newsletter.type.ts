import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('Newsletter')
export class NewsletterType {
  @Field((type) => ID)
  id: string;

  @Field({ nullable: true })
  email: string;

  @Field()
  name: string;

  @Field()
  createdAt: Date;
}

export interface EmailPayload {
  email: string;
  name: string;
}
