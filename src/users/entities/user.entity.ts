import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  BaseEntity,
} from 'typeorm';
import { Address } from '../../address/entities/address.entity';
import { Cart } from '../../cart/entities/cart.entity';
import { Order } from '../../order/entities/order.entity';
import { Payment } from '../../payment/entities/payment.entity';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Address, (address) => address.user)
  addresses: Address[];

  @OneToMany(() => Cart, (cart) => cart.user)
  carts: Cart[];

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @OneToMany(() => Payment, (payment) => payment.user)
  payments: Payment[];
}
