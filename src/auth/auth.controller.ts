import { Controller, Post, Body, HttpCode, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('login')
  @HttpCode(200)
  async login(@Body() loginUserDto: { username: string; password: string }) {
    const user = await this.authService.validateUser(
      loginUserDto.username,
      loginUserDto.password,
    );
    console.log('User after validation:', user); // Log added

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.authService.login(user);
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.register(createUserDto);
    const { password, ...result } = user;
    return result;
  }
}
