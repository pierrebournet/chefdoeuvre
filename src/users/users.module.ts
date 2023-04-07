import { Module } from '@nestjs/common';
import { UserService } from './users.service';
import { UserController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // Importation du module TypeOrm avec l'entité User
  controllers: [UserController], // Importation du contrôleur UserController
  providers: [UserService], // Importation du service UserService
})
export class UserModule {} // Exportation du module UserModule

