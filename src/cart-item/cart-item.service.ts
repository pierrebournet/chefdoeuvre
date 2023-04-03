import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { CartItem } from './entities/cart-item.entity';

@Injectable()
export class CartItemService {

  create(createCartItemDto: CreateCartItemDto) {
    const cartItem = CartItem.create(createCartItemDto);
    return cartItem.save();
  }

  findAll() {
    return CartItem.find();
  }

  findOne(id: number) {
    return CartItem.findOne({ where: { id } });
  }

  async update(id: number, updateCartItemDto: UpdateCartItemDto) {
    const cartItem = await CartItem.preload({ id, ...updateCartItemDto });
  
    if (!cartItem) {
      throw new NotFoundException(`CartItem with ID ${id} not found`);
    }
  
    await cartItem.save();
    return cartItem;
  }
  
  async remove(id: number) {
    await CartItem.delete(id);
  }
}
