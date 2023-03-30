import { OrderLine } from 'src/orderline/entities/orderline.entity';
import { Users } from 'src/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @Column()
  status: string;

  @Column()
  shipping_fee: number;

  @Column()
  taxes: number;

  @ManyToOne(() => Users, (user) => user.orders)
  user: Users;

  @OneToMany(() => OrderLine, (orderLine) => orderLine.order)
  orderLines: OrderLine[];
}

