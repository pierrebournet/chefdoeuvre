import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  create(createProductDto: CreateProductDto) {
    const product = Product.create(createProductDto as any);
    return product.save();
  }

  findAll(search: string) {
    if (search) {
      return Product.createQueryBuilder('product')
        .where('product.name ILIKE :search', { search: `%${search}%` })
        .orWhere('product.description ILIKE :search', { search: `%${search}%` })
        .getMany();
    }
    return Product.find();
  }

  findOne(id: number) {
    return Product.findOne({ where: { id } });
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    await Product.update({ id }, updateProductDto);
    return Product.findOne({ where: { id } });
  }

  remove(id: number) {
    return Product.delete(id);
  }
}