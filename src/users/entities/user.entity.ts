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
  id: number; // ID de l'utilisateur (clé primaire)

  @Column({ unique: true })
  username: string; // Nom d'utilisateur unique

  @Column({ unique: true })
  email: string; // Adresse e-mail unique

  @Column()
  password: string; // Mot de passe de l'utilisateur

  @CreateDateColumn()
  created_at: Date; // Date de création de l'utilisateur

  @UpdateDateColumn()
  updated_at: Date; // Date de mise à jour de l'utilisateur

  // Relations avec d'autres entités
  @OneToMany(() => Address, (address) => address.user)
  addresses: Address[]; // Liste des adresses de l'utilisateur

  @OneToMany(() => Cart, (cart) => cart.user)
  carts: Cart[]; // Liste des paniers de l'utilisateur

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[]; // Liste des commandes de l'utilisateur

  @OneToMany(() => Payment, (payment) => payment.user)
  payments: Payment[]; // Liste des paiements de l'utilisateur
}

