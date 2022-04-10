import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';

@InputType()
export class ProductOptionsInput {
  @Field({ nullable: true })
  size?: string;

  @Field({ nullable: true })
  color?: string;
}

@ObjectType()
export class ProductOptions {
  @Field({ nullable: true })
  size?: string;

  @Field()
  color?: string;
}
