import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  // Crée un nouvel utilisateur
  create(createUserDto: CreateUserDto) {
    const user = User.create(createUserDto as any);
    return user.save();
  }

  // Récupère tous les utilisateurs
  findAll() {
    return User.find();
  }

  // Récupère un utilisateur par ID
  async findOne(id: number) {
    return await User.findOne({ where:{ id }});
  }

  // Récupère un utilisateur par nom d'utilisateur
  async findByUsername(username: string): Promise<User | undefined> {
    return User.findOne({ where: { username } });
  }

  // Met à jour un utilisateur
  async update(id: number, updateUserDto: UpdateUserDto) {
    await User.update({ id }, updateUserDto);
    return User.findOne({ where:{ id }});
  }

  // Supprime un utilisateur
  remove(id: number) {
    return User.delete(id);
  }
}
