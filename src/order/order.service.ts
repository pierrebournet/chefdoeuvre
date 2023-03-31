import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { Users } from '../users/entities/user.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const user = await this.userRepository.findOneOrFail({ where: { id: createOrderDto.userId } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const order = new Order();
    order.user = user;

    return await this.orderRepository.save(order);
  }

  async findAll(): Promise<Order[]> {
    return await this.orderRepository.find({ relations: ['user', 'orderItems'] });
  }

  async findOne(id: number): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: ['user', 'orderItems'],
    });
    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }
    return order;
  }
  

  async update(id: number, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const existingOrder = await this.findOne(id);
    if (!existingOrder) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }
  
    const updatedOrder = await this.orderRepository.preload({
      id,
      ...updateOrderDto,
    });
  
    if (!updatedOrder) {
      throw new NotFoundException(`Failed to update order with id ${id}`);
    }
  
    await this.orderRepository.save(updatedOrder);
    return updatedOrder;
  }
  

  async remove(id: number): Promise<void> {
    await this.orderRepository.delete(id);
  }

  async delete(id: number): Promise<void> {
    const result = await this.orderRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
  }
  
}
