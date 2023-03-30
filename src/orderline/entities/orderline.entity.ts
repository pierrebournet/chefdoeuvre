import { Order } from 'src/order/entities/order.entity';
import { Product } from 'src/product/entities/product.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class OrderLine {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @Column()
  unit_price: number;

  @ManyToOne(() => Product, (product) => product.orderLines)
  product: Product;

  @ManyToOne(() => Order, (order) => order.orderLines)
  order: Order;
}
