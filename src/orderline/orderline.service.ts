import { Injectable } from '@nestjs/common';
import { CreateOrderLineDto } from './dto/create-orderline.dto';
import { UpdateOrderLineDto } from './dto/update-orderline.dto';
import { OrderLine } from './entities/orderline.entity';

@Injectable()
export class OrderLineService {
  create(createOrderLineDto: CreateOrderLineDto) {
    const orderLine = OrderLine.create(createOrderLineDto);
    return orderLine.save();
  }

  findAll() {
    return OrderLine.find({ relations: ['order', 'product'] });
  }

  findOne(id: number) {
    return OrderLine.findOne({ where: { id }, relations: ['order', 'product'] });
  }

  async update(id: number, updateOrderLineDto: UpdateOrderLineDto) {
    await OrderLine.update({ id }, updateOrderLineDto);
    return OrderLine.findOne({ where: { id }, relations: ['order', 'product'] });
  }

  remove(id: number) {
    return OrderLine.delete(id);
  }
}
