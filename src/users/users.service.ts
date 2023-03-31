import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<Users> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const newUser = this.userRepository.create({ ...createUserDto, password: hashedPassword });
    return await this.userRepository.save(newUser);
  }

  async findAll(): Promise<Users[]> {
    return await this.userRepository.find();
  }

  async findOne(id: number): Promise<Users> {
    return await this.userRepository.findOneOrFail({ where: { id } });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<Users> {
    const foundUser = await this.userRepository.findOneOrFail({ where: { id } });
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }
    const updatedUser = this.userRepository.merge(foundUser, updateUserDto);
    return await this.userRepository.save(updatedUser);
  }

  async delete(id: number): Promise<void> {
    await this.userRepository.findOneOrFail({ where: { id } });
  }
}