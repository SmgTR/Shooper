import { CategoriesType } from 'src/categories/categories.type';

import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity()
export class Products {
  @ObjectIdColumn()
  _id: ObjectID;
  @Column()
  productId: string;
  @Column()
  name: string | RegExp;
  @Column()
  brand: string;
  @Column()
  categories: CategoriesType;
  @Column()
  price: number;
  @Column()
  priceWithTax: number;
  @Column()
  priceWithoutTax: number;
  @Column()
  ean: number;
  @Column()
  tax: number;
  @Column()
  description: string;
  @Column()
  image: string[];
  @Column()
  quantity: number;
  @Column()
  createdAt: string | Date;
  @Column()
  availableOptions: { size: string; color: string }[];
  @Column()
  status: string;
}
