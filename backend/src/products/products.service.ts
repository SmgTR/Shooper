import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectID, Repository } from 'typeorm';
import { Products } from '../entities/products.entity';
import { v4 as uuid } from 'uuid';
import { CreateProductsInput, EditProductsInput } from './products.input';

import { errorHandler } from 'src/utils/errorHandler';
import { Categories } from 'src/entities/categories.entity';
import { stringify } from 'querystring';
import { CategoriesType } from 'src/categories/categories.type';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products)
    private productsRepository: Repository<Products>,
    @InjectRepository(Categories)
    private categoriesRepository: Repository<Categories>,
  ) {}

  async getProduct(id: string): Promise<Products> {
    id = id.split('-')[0];
    const product = await this.productsRepository.findOne({
      where: {
        productId: new RegExp(`^${id}`),
      },
    });

    if (!product) {
      errorHandler(
        `Error cannot find product with ID that include: ${id}`,
        '404',
      );
    }
    return product;
  }

  async getProducts(sortBy?): Promise<Products[]> {
    try {
      let allProducts;
      if (!sortBy) {
        allProducts = await this.productsRepository.find();
      }

      if (sortBy) {
        const { sort, value } = sortBy;

        allProducts = await this.productsRepository.find({
          order: {
            [sort]: value,
          },
        });
      }
      allProducts.map((product) => {
        product.createdAt = new Date(product.createdAt).toString();
      });
      return allProducts;
    } catch (err) {
      errorHandler(`Something went wrong, try again later: ${err}`, '503');
    }
  }

  async getUserProducts(productsData) {
    const productsIds = productsData.map((product) => {
      return product.id;
    });
    const products = await this.productsRepository.find({
      where: {
        id: {
          $in: productsIds,
        },
      },
    });

    return products;
  }

  async getSearch(search): Promise<Products[]> {
    const productFound = await this.productsRepository.find({
      where: {
        $or: [
          { id: new RegExp(search) },
          { brand: new RegExp(search) },
          { name: new RegExp(search) },
          { description: new RegExp(search) },
        ],
      },
    });

    if (productFound.length === 0) {
      errorHandler(`Cannot find product which includes ${search}`, '404');
    }

    return productFound;
  }

  //Keep plural naming for future features
  async editProducts(editProductInput: EditProductsInput): Promise<any> {
    interface productType {
      name?: string;
      _id: ObjectID | string;
      brand?: string;
      productId?: string;
      price?: number;
      description?: string;
      categories?: CategoriesType;
      image?: string[];
      quantity?: number;
      availableOptions: any;
    }
    try {
      const id = editProductInput.productId;

      const productToUpdate = await this.productsRepository.findOne({
        where: { productId: id },
      });

      const newProductData: productType = {
        ...productToUpdate,
        ...editProductInput,
      };

      newProductData._id = productToUpdate._id;

      const { name, brand, categories } = newProductData;

      const easyId = `${
        newProductData.productId.split('-')[0]
      }-${brand}-${name}`.replace(/ /g, '-');

      const productCategories = await this.categoriesRepository.findOne(
        categories,
      );

      newProductData.categories = { ...productCategories };
      newProductData.productId = easyId;

      return this.productsRepository.save(newProductData);
    } catch {
      return errorHandler('404', 'Product does not exist');
    }
  }

  async createProduct(
    createProductsInput: CreateProductsInput,
  ): Promise<Products> {
    const {
      name,
      brand,
      description,
      image,
      quantity,
      price,
      tax,
      priceWithoutTax,
      priceWithTax,
      availableOptions,
      categories,
      ean,
    } = createProductsInput;

    const easyId = `${uuid().split('-')[0]}-${brand}-${name}`.replace(
      / /g,
      '-',
    );

    const isAvailable = quantity > 0 ? 'available' : 'out_of_stock';
    if (image.length <= 1) {
      image: [image];
    }

    const productCategories = await this.categoriesRepository.findOne(
      categories,
    );

    const product = this.productsRepository.create({
      productId: easyId,
      name,
      brand,
      description,
      image,
      quantity,
      price,
      ean,
      tax: tax ? tax : 23,
      priceWithoutTax,
      priceWithTax,
      categories: productCategories,
      createdAt: new Date(),
      availableOptions,
      status: isAvailable,
    });

    return this.productsRepository.save(product);
  }
}
