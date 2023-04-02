import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Payment } from './entities/payment.entity';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
  ) {}

  create(createPaymentDto: CreatePaymentDto) {
    const payment = this.paymentRepository.create(createPaymentDto);
    return this.paymentRepository.save(payment);
  }

  findAll() {
    return this.paymentRepository.find();
  }

  findOne(id: number) {
    const options: FindOneOptions<Payment> = { where: { id } };
    return this.paymentRepository.findOne(options);
  }

  async update(id: number, updatePaymentDto: UpdatePaymentDto) {
    await this.paymentRepository.update(id, updatePaymentDto);
    const options: FindOneOptions<Payment> = { where: { id } };
    return this.paymentRepository.findOne(options);
  }

  async remove(id: number): Promise<void> {
    await this.paymentRepository.delete
  }
}