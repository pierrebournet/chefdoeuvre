import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { UserService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}// injection du service UserService

  @Post()
  create(@Body() createUserDto: CreateUserDto)//Création d'un nouvel utilisateur 
   {
    return this.userService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard) // Protection de la route avec l'authentification JWT
  @Get()
  findAll() //Récupération de tous les utilisateurs 
  {
    return this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard)// protection de la route avec JWT
  @Get(':id')
  findOne(@Param('id') id: string) //récupération d' un utilisateur par son id 
   {
    return this.userService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)//protection de la route avec JWT 
  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) //Mise à jour d'un utilisateur par son ID
  {
    return this.userService.update(+id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)//Protection de la route par JWT
  @Delete(':id')
  remove(@Param('id') id: string) //Suppression d'un utlisateur par son id 
  {
    return this.userService.remove(+id);
  }
}
