import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
 // Cette classe étend simplement AuthGuard avec la stratégie 'jwt',
  // créant un garde d'authentification JWT pour protéger les routes