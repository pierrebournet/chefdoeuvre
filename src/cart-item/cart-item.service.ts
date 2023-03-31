import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartItem } from './entities/cart-item.entity';
import { CreateCartItemDto } from './dto/create-cart-item.dto';

@Injectable()
export class CartItemService {
  constructor(
    @InjectRepository(CartItem)
    private cartItemRepository: Repository<CartItem>,
  ) {}

  async create(createCartItemDto: CreateCartItemDto): Promise<CartItem> {
    const cartItem = this.cartItemRepository.create(createCartItemDto);
    return this.cartItemRepository.save(cartItem);
  }

  findAll(): Promise<CartItem[]> {
    return this.cartItemRepository.find();
  }

  findOne(id: number): Promise<CartItem> {
    return this.cartItemRepository.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.cartItemRepository.delete(id);
  }
}
