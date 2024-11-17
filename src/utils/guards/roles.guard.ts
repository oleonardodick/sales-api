import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Papel } from '@prisma/client';
import { Messages } from '../messages';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Papel[]>('papeis', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    const isValid = requiredRoles.some((papel) => user.papel === papel);

    if (!isValid) {
      throw new ForbiddenException(Messages.errors.forbidenAccess);
    }

    return isValid;
  }
}
