import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { FindOneOptions } from 'typeorm';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
  ) {}

  create(createOrderDto: CreateOrderDto) {
    const order = this.orderRepository.create(createOrderDto);
    return this.orderRepository.save(order);
  }

  findAll() {
    return this.orderRepository.find();
  }

  findOne(id: number) {
    const options: FindOneOptions<Order> = { where: { id } };
    return this.orderRepository.findOne(options);
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    await this.orderRepository.update(id, updateOrderDto);
    const options: FindOneOptions<Order> = { where: { id } };
    return this.orderRepository.findOne(options);
  }

  async remove(id: number): Promise<void> {
    await this.orderRepository.delete(id);
  }
}
