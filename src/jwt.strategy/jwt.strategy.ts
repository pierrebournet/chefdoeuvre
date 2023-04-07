import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { AuthService } from '../auth/auth.service';


const SECRET_KEY = 'PierreJeab';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extrait le JWT de l'en-tête d'autorisation
      ignoreExpiration: false, // Vérifie l'expiration du JWT
      secretOrKey: SECRET_KEY, // Utilise la même clé secrète que celle définie dans auth.module.ts
    });
  }

  // Valide le payload du JWT
  async validate(payload: any) {
    // Appelle validateUser avec le nom d'utilisateur et le mot de passe du payload
    return await this.authService.validateUser(payload.username, payload.password);
  }
}

