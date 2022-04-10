import { CartItem } from 'src/models/cart.model';
import {
  Column,
  Entity,
  ObjectIdColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  @ObjectIdColumn()
  _id: string;
  @Column()
  name: string;
  @Column({ nullable: true })
  lastName: string;
  @Column({ nullable: true })
  deliveryAddresses: string[];
  @Column({ nullable: true })
  provider: 'facebook' | 'google';
  @Column()
  newsletter: boolean;
  @Column({ unique: true })
  email: string;
  @Column({ nullable: true })
  password?: string;
  @Column()
  cart: CartItem[];
  @Column()
  createdAt: string | Date;
  @Column()
  refreshToken: { refreshToken: string; refreshTokenExp: string };
}
