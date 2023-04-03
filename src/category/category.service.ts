import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {

  create(createCategoryDto: CreateCategoryDto) {
    const category = Category.create({ ...createCategoryDto } as Category);
    return category.save();
  }

  findAll() {
    return Category.find();
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
