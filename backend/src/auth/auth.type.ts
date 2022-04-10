import { Field, ID, ObjectType } from '@nestjs/graphql';
import { CartItem } from 'src/models/cart.model';

@ObjectType('StaffUsers')
export class JwtType {
  @Field((type) => ID!)
  _id: string;
  @Field()
  email: string;
}
@ObjectType('User')
export class User {
  @Field((type) => ID!)
  _id: string;
  @Field()
  email: string;
  @Field()
  role?: string;
  @Field((type) => Date)
  createdAt?: string | Date;
  @Field((type) => [ID])
  cart?: CartItem[];
  @Field()
  ordersHistory?: string;
}

@ObjectType('LoginUsers')
export class LoginType {
  @Field((type) => ID!)
  _id: string;
  @Field()
  accessToken: string;
}
