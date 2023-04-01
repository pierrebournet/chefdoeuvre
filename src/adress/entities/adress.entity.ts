import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
  } from 'typeorm';
  import { User } from '../../users/entities/user.entity';
  
  @Entity('address')
  export class Address {
    @PrimaryGeneratedColumn()
    id: number;
  
    @ManyToOne(() => User, (user) => user.addresses)
    user: User;
  
    @Column()
    street: string;
  
    @Column()
    city: string;
  
    @Column()
    zip_code: string;
  
    @Column()
    country: string;
  
    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
  }
  