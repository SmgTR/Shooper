import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';

@ObjectType('StaffUsers')
export class StaffType {
  @Field((type) => ID!)
  _id: string;
  @Field()
  username: string;

  @Field()
  email: string;

  @Field()
  role: UserStatus;

  @Field()
  createdAt: string;
}

export enum UserStatus {
  ADMIN = 'admin',
  MODERATOR = 'moderator',
}

registerEnumType(UserStatus, { name: 'UserStatus' });
