import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Categories } from 'src/entities/categories.entity';
import { getMongoRepository, ObjectID, Repository } from 'typeorm';

interface Category {
  parent?: string;
  name: string;
  category: string;
  children?: [Category];
  products?: string[];
}

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Categories)
    private categoriesRepository: Repository<Categories>,
  ) {}

  CreateCategories(categories, parent?) {
    const categoryList = [];
    let category;
    if (parent == null) {
      category = categories.filter((cat) => cat.parent == undefined);
    } else {
      category = categories.filter((cat) => cat.parent == parent);
    }

    for (const cate of category) {
      categoryList.push({
        _id: cate._id,
        name: cate.name,
        category: cate.category,
        products: cate.products,
        children: this.CreateCategories(categories, cate._id),
      });
    }

    return categoryList;
  }

  async GetCategories() {
    const categories = await this.categoriesRepository.find();

    if (categories) {
      return this.CreateCategories(categories);
    }
  }

  async getCategory(id: string) {
    return await this.categoriesRepository.findOne(id);
  }

  async addCategory({ parent, name, category }: Category) {
    const newCategory = this.categoriesRepository.create({
      name,
      category,
    });

    if (parent) newCategory.parent = parent;

    return this.categoriesRepository.save(newCategory);
  }

  async deleteCategory(name) {
    const item = this.categoriesRepository.find(name);
    const repo = getMongoRepository(Categories);
    repo.deleteOne(item);
  }
}
