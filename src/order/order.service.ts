import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrderService {
  private readonly apiUrl = 'https://www.realisaprint.com/api';

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

  async createOrder(orderData: any): Promise<any> {
    const response = await fetch(`${this.apiUrl}/create_order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      throw new Error("Erreur lors de la création de la commande");
    }

    return response.json();
  }
}
