import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ProductType } from 'src/products/products.type';

@ObjectType()
export class CartItem {
  @Field((type) => ID)
  id: string;

  @Field((type) => ProductType)
  product?: any;

  @Field()
  quantity: number;
}
