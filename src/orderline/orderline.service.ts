import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderLineDto } from './dto/create-orderline.dto';
import { UpdateOrderLineDto } from './dto/update-orderline.dto';
import { OrderLine } from './entities/orderline.entity';
import { FindOneOptions } from 'typeorm';

@Injectable()
export class OrderLineService {
  constructor(
    @InjectRepository(OrderLine)
    private orderLineRepository: Repository<OrderLine>,
  ) {}

  create(createOrderLineDto: CreateOrderLineDto) {
    const orderLine = this.orderLineRepository.create(createOrderLineDto);
    return this.orderLineRepository.save(orderLine);
  }

  findAll() {
    return this.orderLineRepository.find({ relations: ['order', 'product'] });
  }


  findOne(id: number) {
    const options: FindOneOptions<OrderLine> = {
      where: { id },
      relations: ['order', 'product'],
    };
    return this.orderLineRepository.findOne(options);
  }
  async update(id: number, updateOrderLineDto: UpdateOrderLineDto) {
    await this.orderLineRepository.update(id, updateOrderLineDto);
    const options: FindOneOptions<OrderLine> = {
      where: { id },
      relations: ['order', 'product'],
    };
    return this.orderLineRepository.findOne(options);
  }

  remove(id: number) {
    return this.orderLineRepository.delete(id);
  }
}
