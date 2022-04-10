import { Field, ID, ObjectType } from '@nestjs/graphql';

import { CartItem } from 'src/models/cart.model';

@ObjectType('ShopUsers')
export class ShopUser {
  @Field((type) => ID!)
  _id: string;
  @Field()
  name: string;
  @Field({ nullable: true })
  lastName: string;

  @Field((type) => [String], { nullable: true })
  deliveryAddresses: string[];

  @Field()
  email: string;

  @Field()
  newsletter: boolean;

  @Field((type) => [CartItem])
  cart: CartItem[];

  @Field()
  createdAt: string;
}
