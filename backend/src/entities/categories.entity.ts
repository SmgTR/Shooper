import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity()
export class Categories {
  @ObjectIdColumn()
  _id: string;
  @Column()
  name: string;
  @Column()
  parent: string;
  @Column({ nullable: true })
  products?: [string];
  @Column()
  category: string;
}
