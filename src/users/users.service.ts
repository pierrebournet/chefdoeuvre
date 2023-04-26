import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  create(createUserDto: CreateUserDto) {
    const user = User.create(createUserDto as any);
    return user.save();
  }

  async register(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = User.create({
      ...createUserDto,
      password: hashedPassword,
    });
    return user.save();
  }

  async createAdmin(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const admin = User.create({
      ...createUserDto,
      password: hashedPassword,
      isAdmin: true,
    });
    return admin.save();
  }

  findAll() {
    return User.find();
  }

  async findById(id: number): Promise<User | undefined> {
    return await User.findOne({ where: { id } });
  }

  async findOne(id: number) {
    return await User.findOne({ where: { id } });
  }

  async findByUsername(username: string): Promise<User | undefined> {
    return User.findOne({ where: { username } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await User.update({ id }, updateUserDto);
    return User.findOne({ where: { id } });
  }

  remove(id: number) {
    return User.delete(id);
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.findByUsername(username);
    if (!user) {
      return null;
    }
    const passwordMatches = await bcrypt.compare(password, user.password);
    console.log('Password matches:', passwordMatches);
    if (passwordMatches) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
