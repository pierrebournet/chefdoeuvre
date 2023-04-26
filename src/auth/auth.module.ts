import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../jwt.strategy/jwt.strategy';
import { UserService } from 'src/users/users.service';
import { AdminAuthGuard } from './admin-auth.guard'; // Ajoutez cette ligne

const SECRET_KEY = 'PierreJeab';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: SECRET_KEY, // Utilisez la constante pour la clé secrète
      signOptions: { expiresIn: '1h' },
    }), // le jwt expire apres 1h
  ],
  providers: [AuthService, UserService, JwtStrategy, AdminAuthGuard], // Ajoutez AdminAuthGuard ici
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {
  // Ce module importe les modules nécessaires, enregistre le service JWT
  // avec la clé secrète et les options de signature et exporte le service d'authentification
}
