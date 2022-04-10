import { Field, ID, InputType, Int, registerEnumType } from '@nestjs/graphql';
import {
  MinLength,
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  Matches,
} from 'class-validator';

@InputType()
export class CreateUserInput {
  @MinLength(1)
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  @Field()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Field()
  name: string;

  @Field({ nullable: true })
  lastName: string;

  @Field({ nullable: true })
  newsletter: boolean;

  @Field((type) => [String], { nullable: true })
  deliveryAddresses: string[];

  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(32)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'Password is too weak- must include at least one uppercase letter and a number.',
  })
  @Field()
  password: string;
}

@InputType()
export class ManageUserCartInput {
  @Field((type) => ID)
  productId: string;
  @Field((type) => AddOrRemove)
  action: 'ADD' | 'REMOVE';
  @Field((type) => Int, { nullable: true })
  amount?: number;
}

@InputType()
export class UserCredentials {
  @MinLength(1)
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  @Field((type) => String)
  email: string;

  @IsNotEmpty()
  @Field((type) => String)
  password: string;
}

export enum AddOrRemove {
  ADD = 'ADD',
  REMOVE = 'REMOVE',
}

registerEnumType(AddOrRemove, { name: 'AddOrRemove' });
