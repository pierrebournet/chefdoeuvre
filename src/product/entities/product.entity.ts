import { Category } from 'src/category/entities/category.entity';
import { OrderLine } from 'src/orderline/entities/orderline.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  imageUrl: string;

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;

  @OneToMany(() => OrderLine, (orderLine) => orderLine.product)
  orderLines: OrderLine[];
}

