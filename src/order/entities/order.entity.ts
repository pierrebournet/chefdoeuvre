import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Payment } from '../../payment/entities/payment.entity';
import { Address } from '../../adress/entities/adress.entity';
import { OrderLine } from '../../orderline/entities/orderline.entity';

@Entity('order')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @ManyToOne(() => Payment, (payment) => payment.order, { nullable: true })
  payment: Payment;

  @ManyToOne(() => Address)
  shipping_address: Address;

  @ManyToOne(() => Address)
  billing_address: Address;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total: number;

  @Column()
  status: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => OrderLine, (orderLine) => orderLine.order)
  orderLines: OrderLine[];
}
