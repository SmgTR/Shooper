import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Products } from '../entities/products.entity';

import { Categories } from 'src/entities/categories.entity';

import { ProductsResolver } from './products.resolver';
import { ProductsService } from './products.service';

@Module({
  imports: [TypeOrmModule.forFeature([Products, Categories])],
  providers: [ProductsResolver, ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}
