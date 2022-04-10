import {
  Column,
  Entity,
  ObjectIdColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Auth {
  @PrimaryGeneratedColumn()
  @ObjectIdColumn()
  _id: string;
  @Column()
  email: string;
  @Column()
  password: string;
}
