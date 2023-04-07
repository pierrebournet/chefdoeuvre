import { Injectable } from '@nestjs/common';
import { UserService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

   // Valide un utilisateur en fonction du nom d'utilisateur et du mot de passe
   async validateUser(username: string, password: string): Promise<any> {
    // Recherche l'utilisateur par nom d'utilisateur
    const user = await this.userService.findByUsername(username);
    // Si l'utilisateur existe et que le mot de passe correspond
    if (user && user.password === password) {
      // Renvoie l'utilisateur sans le mot de passe
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  // Connecte un utilisateur et crée un JWT
  async login(user: any) {
    // Crée le payload contenant le nom d'utilisateur et l'ID de l'utilisateur
    const payload = { username: user.username, sub: user.userId };
    // Retourne le JWT signé
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
