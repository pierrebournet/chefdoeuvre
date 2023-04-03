import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrderService {
  create(createOrderDto: CreateOrderDto) {
    const order = Order.create(createOrderDto);
    return order.save();
  }

  findAll() {
    return Order.find();
  }

  findOne(id: number) {
    return Order.findOne({ where: { id } });
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    await Order.update({ id }, updateOrderDto);
    return Order.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await Order.delete(id);
  }
}
