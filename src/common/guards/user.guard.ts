import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

canActivate(
        constext: ExecutionContext
    ): boolean | Promise<boolean> | Observable<boolean>{
        const req: Request | any = constext.switchToHttp().getRequest();
        const authHeader = req.headers.authorization

        if(!authHeader){
            throw new UnauthorizedException("Unauthorized user");
        }

        const bearer = authHeader.split(" ")[0]
        const token = authHeader.split(" ")[1]

        if(bearer !== "Bearer" || !token){
            throw new UnauthorizedException("Unauthorized user");
        }

        async function verify(token: string, jwtService: JwtService) {
            let payload: any;
            try{
                payload = await jwtService.verify(token, {
                    secret: process.env.ACCES_TOKEN_KEY,
                });
            } catch(error){
                console.log(error)
                throw new BadRequestException(error);
            }

            if(!payload){
                throw new UnauthorizedException("Unauthorized user");
            }
            if(!payload.is_active){
                throw new ForbiddenException("U are not active user");
            }
            req.user = payload;
            return true;
        }
        return verify(token, this.jwtService)
    }
}
