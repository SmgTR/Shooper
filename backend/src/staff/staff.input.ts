import { Field, InputType } from '@nestjs/graphql';
import {
  MinLength,
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  Matches,
} from 'class-validator';
import { UserStatus } from './staff.type';

@InputType()
export class CreateStaffInput {
  @MinLength(1)
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  @Field()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Field()
  username: string;

  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(32)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'Password is too weak- must include at least one uppercase letter and a number.',
  })
  @Field()
  password: string;

  @IsNotEmpty()
  @Field((type) => UserStatus)
  role: UserStatus;
}

@InputType()
export class StaffCredentials {
  @MinLength(1)
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  @Field()
  email: string;
  @IsString()
  @IsNotEmpty()
  @Field()
  username: string;
  @IsNotEmpty()
  @Field()
  password: string;
}
