import { Injectable } from '@nestjs/common';
import { UserService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    if (!username || !password) {
      return null;
    }

    const user = await this.userService.findByUsername(username);
    console.log('User found:', user); // Log added

    if (user && user.password) {
      const passwordMatches = await bcrypt.compare(password, user.password);
      console.log('Password matches:', passwordMatches); // Log added

      if (passwordMatches) {
        const { password, ...result } = user;
        return result;
      }
    }

    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId, isAdmin: user.isAdmin };
    return {
      ...user,
      access_token: this.jwtService.sign(payload),
    };
  }
}
