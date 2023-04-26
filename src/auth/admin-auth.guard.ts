import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AdminAuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // Ici, vérifiez si l'utilisateur a un rôle administrateur.
    // Comme nous avons ajouté le champ "isAdmin" au payload JWT, nous pouvons maintenant vérifier:
    return user && user.isAdmin;
  }
}
