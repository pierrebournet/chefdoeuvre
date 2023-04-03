import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    BaseEntity,
  } from 'typeorm';
  import { User } from '../../users/entities/user.entity';
  
  @Entity('address')
  export class Address extends BaseEntity {
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
  