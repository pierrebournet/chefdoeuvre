import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { CartItemService } from './cart-item.service';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { CartItem } from './entities/cart-item.entity';

@Controller('cart-item')
export class CartItemController {
  constructor(private readonly cartItemService: CartItemService) {}

  @Post()
  create(@Body() createCartItemDto: CreateCartItemDto): Promise<CartItem> {
    return this.cartItemService.create(createCartItemDto);
  }

  @Get()
  findAll(): Promise<CartItem[]> {
    return this.cartItemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<CartItem> {
    return this.cartItemService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.cartItemService.remove(id);
  }
}
