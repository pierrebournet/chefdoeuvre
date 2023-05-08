import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { createCategorie } from 'src/sripts/createCategories';

@Injectable()
export class CategoryService {

  async create(createCategoryDto: CreateCategoryDto) {
    const category = await Category.create({ ...createCategoryDto } as Category);
    return category.save();
  }

  async findAll() {
    let categories = await Category.find();
    if (categories.length === 4 ) {
      return categories;
    } else {
      console.log( 'create new CAt ')
      createCategorie()
      categories = await Category.find();
      return categories
    }
  }

  findOne(id: number) {
    return Category.findOne({ where: { id } });
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    await Category.update({ id }, updateCategoryDto);
    return Category.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await Category.delete(id);
  }
}
