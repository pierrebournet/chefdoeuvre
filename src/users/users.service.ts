import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  create(createUserDto: CreateUserDto) {
    const user = User.create(createUserDto as any);
    return user.save();
  }
  

  findAll() {
    return User.find();
  }

  async findOne(id: number) {
    return await User.findOne({ where:{ id }});
  }

  async findByUsername(username: string): Promise<User | undefined> {
    return User.findOne({ where: { username } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await User.update({ id }, updateUserDto);
    return User.findOne({ where:{ id }});
  }
  

  remove(id: number) {
    return User.delete(id);
  }
}
