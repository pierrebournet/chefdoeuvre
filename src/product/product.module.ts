import { Module } from '@nestjs/common';
import { UsersController } from '../users/users.controller';
import { UserService } from '../users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../users/entities/user.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  controllers: [UsersController],
  providers: [UserService],
})
export class UserModule {}
