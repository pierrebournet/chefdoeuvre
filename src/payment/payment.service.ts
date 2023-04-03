import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Payment } from './entities/payment.entity';

@Injectable()
export class PaymentService {
  create(createPaymentDto: CreatePaymentDto) {
    const payment = Payment.create(createPaymentDto);
    return payment.save();
  }

  findAll() {
    return Payment.find();
  }

  findOne(id: number) {
    return Payment.findOne({ where: { id } });
  }

  async update(id: number, updatePaymentDto: UpdatePaymentDto) {
    await Payment.update({ id }, updatePaymentDto);
    return Payment.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await Payment.delete(id);
  }
}
