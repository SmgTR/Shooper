import { Field, ID, ObjectType } from '@nestjs/graphql';
import { CategoryItem } from 'src/models/categories.model';
import { ProductOptions } from 'src/models/optionsProduct.model';
import { ObjectIdColumn } from 'typeorm';

@ObjectType('Products')
export class ProductType {
  @Field((type) => String)
  productId: string;

  @ObjectIdColumn()
  _id: string;

  @Field()
  name: string;

  @Field()
  brand: string;

  @Field()
  tax: number;

  @Field()
  description: string;

  @Field()
  createdAt: string;

  @Field()
  price: number;

  @Field()
  priceWithTax: number;
  @Field()
  priceWithoutTax: number;

  @Field({ nullable: true })
  ean: number;

  @Field((type) => [String])
  image: string[];

  @Field()
  quantity: number;

  @Field()
  status: ProductStatus;

  @Field((type) => CategoryItem)
  categories: CategoryItem;

  @Field((type) => [ProductOptions])
  availableOptions: ProductOptions[];
}

export enum ProductStatus {
  AVAILABLE = 'available',
  OUT_OF_STOCK = 'out_of_stock',
}
