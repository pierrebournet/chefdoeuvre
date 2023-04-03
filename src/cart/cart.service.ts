import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Cart } from './entities/cart.entity';

@Injectable()
export class CartService {

  async create(createCartDto: CreateCartDto): Promise<Cart> {
    const cart = Cart.create();
    cart.user = { id: createCartDto.userId } as any;
    
    return await cart.save();
  }

  findAll() {
    return Cart.find({ relations: ['user', 'cartItems'] });
  }

  findOne(id: number) {
    return Cart.findOne({ where: { id }, relations: ['user', 'cartItems'] });
  }

  async update(id: number, updateCartDto: UpdateCartDto): Promise<Cart> {
    const cart = await Cart.findOne({ where: { id } });

    if (!cart) {
      throw new NotFoundException(`Cart with ID ${id} not found`);
    }

    if (updateCartDto.userId) {
      cart.user = { id: updateCartDto.userId } as any;
    }
    await cart.save();

    return Cart.findOne({ where: { id }, relations: ['user', 'cartItems'] });
  }

  async remove(id: number): Promise<void> {
    await Cart.delete(id);
  }
}
