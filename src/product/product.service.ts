import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  create(createProductDto: CreateProductDto) {
    const product = Product.create(createProductDto);
    return product.save();
  }

  findAll() {
    return Product.find({ relations: ['category'] });
  }

  findOne(id: number) {
    return Product.findOne({ where: { id }, relations: ['category'] });
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    await Product.update({ id }, updateProductDto);
    return Product.findOne({ where: { id }, relations: ['category'] });
  }

  remove(id: number) {
    return Product.delete(id);
  }
}
