import {
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    ManyToOne,
    BaseEntity
  } from 'typeorm';
  import { User } from '../../users/entities/user.entity';
  import { CartItem } from '../../cart-item/entities/cart-item.entity';
  
  @Entity('cart')
  export class Cart extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @ManyToOne(() => User, (user) => user.carts)
    user: User;
  
    @OneToMany(() => CartItem, (cartItem) => cartItem.cart)
    cartItems: CartItem[];
  
    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
  }
  