
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Product } from '../product/entities/product.entity';
import { Cart } from '../src/cart/entities/cart.entity';

@Entity()
export class CartItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @ManyToOne(() => Product, (product) => product.cartItems)
  product: Product;

  @ManyToOne(() => Cart, (cart) => cart.cartItems)
  cart: Cart;
}
