import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('Categories')
export class CategoriesType {
  @Field((type) => ID)
  _id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  parent: string;

  @Field((type) => [CategoriesType], { nullable: true })
  children?: [CategoriesType];

  @Field((type) => String)
  category: string;
}
