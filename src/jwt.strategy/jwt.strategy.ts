import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UserService } from '../users/users.service';

const SECRET_KEY = 'PierreJeab';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: SECRET_KEY,
    });
  }

  async validate(payload: any) {
    const user = await this.userService.findById(payload.sub);
    if (user) {
      const { password, ...result } = user;
      return { ...result, isAdmin: payload.isAdmin };
    }
    return null;
  }
}
