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
  
    @ManyToOne(() => User, (user) => user.addresses) // Relation ManyToOne avec la table User
    user: User;
  
    @Column()
    street: string;
  
    @Column()
    city: string;
  
    @Column()
    zip_code: string;
  
    @Column()
    country: string;
  
    @CreateDateColumn() // Date de création de l'adresse
    created_at: Date;
  
    @UpdateDateColumn() // Date de mise à jour de l'adresse
    updated_at: Date;
  }
  

  