import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FindOneOptions } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { CartItem } from './entities/cart-item.entity';

@Injectable()
export class CartItemService {
  constructor(
    @InjectRepository(CartItem)
    private cartItemRepository: Repository<CartItem>,
  ) {}

  create(createCartItemDto: CreateCartItemDto) {
    const cartItem = this.cartItemRepository.create(createCartItemDto);
    return this.cartItemRepository.save(cartItem);
  }

  findAll() {
    return this.cartItemRepository.find();
  }

  findOne(id: number) {
    const options: FindOneOptions<CartItem> = { where: { id } };
    return this.cartItemRepository.findOne(options);
  }

  async update(id: number, updateCartItemDto: UpdateCartItemDto) {
    const cartItem = await this.cartItemRepository.preload({ id, ...updateCartItemDto });
  
    if (!cartItem) {
      throw new NotFoundException(`CartItem with ID ${id} not found`);
    }
  
    await this.cartItemRepository.save(cartItem);
    return cartItem;
  }
  
  
  


  async remove(id: number) {
    await this.cartItemRepository.delete(id);
  }
}
