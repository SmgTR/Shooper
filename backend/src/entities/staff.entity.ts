import {
  Column,
  Entity,
  ObjectIdColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { UserStatus } from '../staff/staff.type';

@Entity()
export class Staff {
  @PrimaryGeneratedColumn()
  @ObjectIdColumn()
  _id: string;
  @Column()
  username: string;
  @Column({ unique: true })
  email: string;
  @Column()
  password: string;
  @Column()
  role: UserStatus;
  @Column()
  createdAt: string | Date;
  @Column()
  refreshToken: { refreshToken: string; refreshTokenExp: string };
}
