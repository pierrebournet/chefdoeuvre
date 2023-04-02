import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  create(createProductDto: CreateProductDto) {
    const product = this.productRepository.create(createProductDto);
    return this.productRepository.save(product);
  }

  findAll() {
    return this.productRepository.find({ relations: ['category'] });
  }

  findOne(id: number) {
    const options: FindOneOptions<Product> = { where: { id }, relations: ['category'] };
    return this.productRepository.findOne(options);
  }
  

  async update(id: number, updateProductDto: UpdateProductDto) {
    await this.productRepository.update(id, updateProductDto);
    const options: FindOneOptions<Product> = { where: { id }, relations: ['category'] };
    return this.productRepository.findOne(options);
  }
  

  remove(id: number) {
    return this.productRepository.delete(id);
  }
}
