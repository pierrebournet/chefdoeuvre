import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './entities/cart.entity';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { FindOneOptions } from 'typeorm';


@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
  ) {}

  async create(createCartDto: CreateCartDto): Promise<Cart> {
    const cart = new Cart();
    cart.user = { id: createCartDto.userId } as any;
    
    return await this.cartRepository.save(cart);
  }

  findAll(): Promise<Cart[]> {
    return this.cartRepository.find({ relations: ['user', 'cartItems'] });
  }

  findOne(id: number): Promise<Cart> {
    const options: FindOneOptions<Cart> = {
      where: { id },
      relations: ['user', 'cartItems'],
    };
    return this.cartRepository.findOne(options);
  }
  

  async update(id: number, updateCartDto: UpdateCartDto): Promise<Cart> {
    const findOneOptions: FindOneOptions<Cart> = {
      where: { id },
    };
    const cart = await this.cartRepository.findOne(findOneOptions);
  
    if (updateCartDto.userId) {
      cart.user = { id: updateCartDto.userId } as any;
    }
    await this.cartRepository.save(cart);
  
    const findUpdatedOptions: FindOneOptions<Cart> = {
      where: { id },
      relations: ['user', 'cartItems'],
    };
    return this.cartRepository.findOne(findUpdatedOptions);
  }

  remove(id: number): Promise<void> {
    return this.cartRepository.delete(id).then(() => {});
  }
}
