import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNumber, MinLength } from 'class-validator';
import { CreateCategoryInput } from 'src/categories/categories.input';
import { CategoriesType } from 'src/categories/categories.type';
import { Categories } from 'src/entities/categories.entity';
import { CategoryItem } from 'src/models/categories.model';

import { ProductOptionsInput } from 'src/models/optionsProduct.model';
import { Any, ObjectID } from 'typeorm';

@InputType()
export class CreateProductsInput {
  @MinLength(1)
  @Field()
  name: string;

  @MinLength(1)
  @Field()
  brand: string;

  @Field((type) => String)
  categories: ObjectID;

  @Field()
  price: number;

  @Field()
  tax: number;

  @Field()
  priceWithTax: number;

  @Field()
  priceWithoutTax: number;

  @Field({ nullable: true })
  ean: number;

  @MinLength(1)
  @Field()
  description: string;

  @Field((type) => [String])
  image: string[];

  @Field((type) => [ProductOptionsInput], { nullable: true })
  availableOptions?: { size?: string; color?: string }[];

  @IsNumber()
  @Field()
  quantity: number;
}

@InputType()
export class EditProductsInput {
  @MinLength(1)
  @Field({ nullable: true })
  name: string;

  @MinLength(1)
  @Field({ nullable: true })
  brand: string;

  @Field({ nullable: true })
  productId: string;

  @Field({ nullable: true })
  price: number;

  @MinLength(1)
  @Field({ nullable: true })
  description: string;

  @Field((type) => String)
  categories: CategoriesType;

  @Field((type) => [String], { nullable: true })
  image: string[];

  @Field((type) => [ProductOptionsInput], { nullable: true })
  availableOptions?: { size?: string; color?: string }[];

  @IsNumber()
  @Field({ nullable: true })
  quantity: number;
}

@InputType()
export class SortByInput {
  @Field()
  field: string;
  @Field()
  value: SortOptions;
}

// export interface SortByInput {
//   field?: string;
//   value?: SortOptions;
// }

export declare enum SortOptions {
  ASC = 'ASC',
  DESC = 'DESC',
}
