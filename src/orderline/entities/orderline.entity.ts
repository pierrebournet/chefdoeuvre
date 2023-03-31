import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { Order } from '../src/order/entities/order.entity';
import { Product } from '../product/entities/product.entity';

@Entity()
export class OrderLine {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @ManyToOne(() => Product, (product) => product.orderLines)
  product: Product;

  @ManyToOne(() => Order, (order) => order.orderLines)
  order: Order;
}
