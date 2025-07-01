import {
  Body,
  Controller,
  HttpCode,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { AdminAuthService } from './admin-auth.service';
import { CreateAdminDto } from '../admin/dto/create-admin.dto';
import { SigninAdminDto } from '../admin/dto/signin-admin.dto';
import { Response } from 'express';
import { CookieGetter } from '../common/decorators/cookie-getter.decorator';
import { ParseIntPipe } from '@nestjs/common';

@Controller('admin-auth')
export class AdminAuthController {
  constructor(private readonly adminAuthService: AdminAuthService) {}

  @Post('signup')
  signup(@Body() createAdminDto: CreateAdminDto) {
    return this.adminAuthService.register(createAdminDto);
  }

  @HttpCode(200)
  @Post('signin')
  signin(
    @Body() signinAdminDto: SigninAdminDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminAuthService.singin(signinAdminDto, res);
  }

  @HttpCode(200)
  @Post('signout')
  signout(
    @CookieGetter('refreshToken') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminAuthService.signout(refreshToken, res);
  }

  @HttpCode(200)
  @Post(':id/refresh')
  refresh(
    @Param('id', ParseIntPipe) id: number,
    @CookieGetter('refreshToken') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminAuthService.refreshToken(id, refreshToken, res);
  }
}
