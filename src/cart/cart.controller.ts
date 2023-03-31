import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { Cart } from './entities/cart.entity';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  create(@Body() createCartDto: CreateCartDto): Promise<Cart> {
    return this.cartService.create(createCartDto);
  }

  @Get()
  findAll(): Promise<Cart[]> {
    return this.cartService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Cart> {
    return this.cartService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.cartService.remove(id);
  }
}
