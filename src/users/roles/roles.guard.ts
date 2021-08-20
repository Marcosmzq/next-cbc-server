import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from './role.enum';
import { ROLES_KEY } from './roles.decorator';
import * as jwt from 'jsonwebtoken';
import { AuthenticationError } from 'apollo-server-errors';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const authHeader = context.getArgs()[2].req.headers.authorization;
    if (!authHeader) {
      throw new AuthenticationError('Authorization header must be provided');
    }
    const token = authHeader.split('Bearer ')[1];
    if (!token) {
      throw new AuthenticationError('Authorization header must be provided');
    }
    const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
    return requiredRoles.some((role) => user.role?.includes(role));
  }
}
