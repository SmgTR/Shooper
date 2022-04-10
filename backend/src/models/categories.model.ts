import { Field, ID, ObjectType } from '@nestjs/graphql';
import { CategoriesType } from 'src/categories/categories.type';
import { ProductType } from 'src/products/products.type';

@ObjectType()
export class CategoryItem {
  @Field((type) => ID)
  _id: string;

  @Field()
  id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  parent: string;

  @Field()
  category: string;
}
