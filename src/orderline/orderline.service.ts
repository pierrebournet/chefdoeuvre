import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderLine } from './entities/orderline.entity';

@Injectable()
export class OrderLineService {
  constructor(
    @InjectRepository(OrderLine)
    private orderLineRepository: Repository<OrderLine>,
  ) {}

  async create(orderLine: OrderLine): Promise<OrderLine> {
    return await this.orderLineRepository.save(orderLine);
  }

  async findAll(): Promise<OrderLine[]> {
    return await this.orderLineRepository.find();
  }

  async findOne(id: number): Promise<OrderLine> {
    return await this.orderLineRepository.findOneOrFail(id);
  }

  async update(id: number, orderLine: OrderLine): Promise<OrderLine> {
    await this.orderLineRepository.update(id, orderLine);
    return await this.orderLineRepository.findOne(id);
  }

  async delete(id: number): Promise<void> {
    await this.orderLineRepository.delete(id);
  }
}
