import { Field, InputType } from '@nestjs/graphql';
import {
  MinLength,
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  Matches,
} from 'class-validator';

@InputType()
export class LogInUser {
  @MinLength(1)
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  @Field()
  email: string;

  @IsNotEmpty()
  @Field()
  password: string;
}
