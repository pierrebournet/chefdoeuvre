import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../jwt.strategy/jwt.strategy';
import { UserService } from 'src/users/users.service';


const SECRET_KEY = 'PierreJeab';


@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: 'SECRET_KEY', // Remplacez par une clé secrète forte
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, UserService,],
  exports: [AuthService],
})
export class AuthModule {}
