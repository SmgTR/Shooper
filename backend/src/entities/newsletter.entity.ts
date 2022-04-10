import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity()
export class Newsletter {
  @ObjectIdColumn()
  _id: string;
  @Column({ unique: true })
  email: string;
  @Column()
  name: string;
  @Column()
  createdAt: Date;
}
