import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Categories } from '../entities/categories.entity';

import { CategoriesResolver } from './categories.resolver';
import { CategoriesService } from './categories.service';

@Module({
  imports: [TypeOrmModule.forFeature([Categories])],
  providers: [CategoriesResolver, CategoriesService],
})
export class CategoriesModule {}
