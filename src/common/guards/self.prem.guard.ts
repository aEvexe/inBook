import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class PremiumGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();

    if (!req.user) {
      throw new ForbiddenException('User information missing from request');
    }

    if (!req.user.is_premium) {
      throw new ForbiddenException('Access denied: Premium membership required');
    }

    return true;
  }
}
