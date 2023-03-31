import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { OrderLineService } from './orderline.service';
import { OrderLine } from './entities/orderline.entity';

@Controller('orderline')
export class OrderLineController {
  constructor(private readonly orderLineService: OrderLineService) {}

  @Post()
  create(@Body() createOrderLineDto: OrderLine): Promise<OrderLine> {
    return this.orderLineService.create(createOrderLineDto);
  }

  @Get()
  findAll(): Promise<OrderLine[]> {
    return this.orderLineService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<OrderLine> {
    return this.orderLineService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateOrderLineDto: OrderLine): Promise<OrderLine> {
    return this.orderLineService.update(id, updateOrderLineDto);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<void> {
    return this.orderLineService.delete(id);
  }
}
