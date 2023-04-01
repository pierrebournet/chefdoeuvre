import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
  } from 'typeorm';
  import { Cart } from '../../cart/entities/cart.entity';
  import { Product } from '../../product/entities/product.entity';
  
  @Entity('cart_item')
  export class CartItem {
    @PrimaryGeneratedColumn()
    id: number;
  
    @ManyToOne(() => Cart, (cart) => cart.cartItems)
    cart: Cart;
  
    @ManyToOne(() => Product)
    product: Product;
  
    @Column()
    quantity: number;
  
    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
  }
  