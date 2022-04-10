import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import {
  CreateProductsInput,
  EditProductsInput,
  SortByInput,
  SortOptions,
} from './products.input';
import { ProductsService } from './products.service';
import { ProductType } from './products.type';

import { GqlAuthGuard } from 'src/guards/gql-auth.guard';
import { Roles } from 'src/decorators/role-user.decorator';
import { UserStatus } from 'src/staff/staff.type';
import { RolesGuard } from 'src/guards/role-auth.guard';
import { v4 as uuid } from 'uuid';

import * as fs from 'fs/promises';

import { GraphQLUpload, FileUpload } from 'graphql-upload';
import { errorHandler } from 'src/utils/errorHandler';

@Resolver((of) => ProductType)
export class ProductsResolver {
  constructor(private productsService: ProductsService) {}

  @Query((returns) => ProductType)
  product(@Args('id', { nullable: true }) id: string) {
    return this.productsService.getProduct(id);
  }

  @Query((returns) => [ProductType])
  productSearch(
    @Args('search')
    search?: SortByInput,
  ) {
    return this.productsService.getSearch(search);
  }

  @Query((returns) => [ProductType])
  products(@Args('sort', { nullable: true }) sortBy?: SortByInput) {
    if (sortBy) {
      return this.productsService.getProducts({
        sort: sortBy.field,
        value: sortBy.value,
      });
    }
    return this.productsService.getProducts();
  }

  @Roles(UserStatus.ADMIN, UserStatus.MODERATOR)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Mutation((returns) => ProductType)
  createProduct(
    @Args('createProductsInput') createProductsInput: CreateProductsInput,
  ) {
    return this.productsService.createProduct(createProductsInput);
  }

  @Roles(UserStatus.ADMIN, UserStatus.MODERATOR)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Mutation((returns) => ProductType)
  editProducts(
    @Args('editProductsInput') editProductsInput: EditProductsInput,
  ) {
    return this.productsService.editProducts(editProductsInput);
  }

  @Roles(UserStatus.ADMIN, UserStatus.MODERATOR)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Mutation((returns) => String)
  async uploadProductPhoto(
    @Args('file', { type: () => GraphQLUpload }) file: FileUpload,
  ): Promise<string> {
    try {
      const { createReadStream, filename } = file;

      const stream = createReadStream();

      const chunks = [];

      async function exists(path) {
        try {
          await fs.access(path);
          return true;
        } catch {
          return false;
        }
      }

      const alreadyExist = await exists(`./public/products/${filename}`);

      const nameWithId =
        filename.split('.')[0] +
        uuid().split('-')[0] +
        '.' +
        filename.split('.')[1];

      const systemFileName = alreadyExist ? nameWithId : filename;

      for await (const chunk of stream) {
        chunks.push(chunk);
      }

      const buffer = Buffer.concat(chunks);

      const base64 = buffer.toString('base64');

      await fs.writeFile(`./public/products/${systemFileName}`, buffer);
      return `public/products/${filename}`;
    } catch (err) {
      errorHandler('Something went wrong', '401');
    }
  }

  @Roles(UserStatus.ADMIN, UserStatus.MODERATOR)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Mutation((returns) => String)
  async deleteProductPhoto(@Args('path') path: string) {
    try {
      fs.unlink(path),
        (err) => {
          if (err) {
            errorHandler('No file or directory!', '404');
          }
        };
      return 'File succesfuly deleted';
    } catch (err) {
      errorHandler('Something went wrong', '401');
    }
  }
}
