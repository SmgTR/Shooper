import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { GqlAuthGuard } from 'src/guards/gql-auth.guard';
import { Roles } from 'src/decorators/role-user.decorator';
import { UserStatus } from 'src/staff/staff.type';
import { RolesGuard } from 'src/guards/role-auth.guard';

import { errorHandler } from 'src/utils/errorHandler';
import { CategoriesType } from './categories.type';
import { CategoriesService } from './categories.service';

import { CreateCategoryInput } from './categories.input';
import { getEnabledCategories } from 'trace_events';

@Resolver((of) => CategoriesType)
export class CategoriesResolver {
  constructor(private categoriesServices: CategoriesService) {}

  @Roles(UserStatus.ADMIN, UserStatus.MODERATOR)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Mutation((returns) => CategoriesType)
  addCategory(
    @Args('createCategoryInput') createCategoryInput: CreateCategoryInput,
  ) {
    return this.categoriesServices.addCategory(createCategoryInput);
  }

  @Query((returns) => [CategoriesType])
  getCategories() {
    return this.categoriesServices.GetCategories();
  }

  @Query((returns) => CategoriesType)
  getCategory(@Args('id') id: string) {
    return this.categoriesServices.getCategory(id);
  }

  @Roles(UserStatus.ADMIN, UserStatus.MODERATOR)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Mutation((returns) => CategoriesType)
  deleteCategory(@Args('name') name: string) {
    return this.categoriesServices.deleteCategory(name);
  }
}
