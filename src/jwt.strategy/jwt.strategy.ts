import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { AuthService } from '../auth/auth.service';


const SECRET_KEY = 'PierreJeab';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: SECRET_KEY, // La même clé secrète que celle définie dans auth.module.ts
    });
  }

  async validate(payload: any) {
    return await this.authService.validateUser(payload.username, payload.password);
  }
}
