import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
  } from 'typeorm';
  import { Order } from '../../order/entities/order.entity';
  
  @Entity('payments')
  export class Payment {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    transactionId: string;
  
    @Column()
    status: string;
  
    @Column('decimal')
    amount: number;
  
    @Column('timestamp')
    createdAt: Date;
  
    @Column()
    orderId: number;
  
    @ManyToOne(() => Order, (order) => order.payment)
    @JoinColumn({ name: 'orderId' })
    order: Order;
  }
  