import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async create(product: Product): Promise<Product> {
    return await this.productRepository.save(product);
  }

  async findAll(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  async findOne(id: number): Promise<Product> {
    return await this.productRepository.findOneOrFail({ where: { id } });
  }

  async update(id: number, product: Product): Promise<Product> {
    const foundProduct = await this.productRepository.findOneOrFail({ where: { id } });
    const updatedProduct = this.productRepository.merge(foundProduct, product);
    return await this.productRepository.save(updatedProduct);
  }

  async delete(id: number): Promise<void> {
    await this.productRepository.findOneOrFail({ where: { id } });
    await this.productRepository.delete({ id });
  }
}
