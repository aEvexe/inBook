import { Body, Controller, HttpCode, Post, Res, Param } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ParseIntPipe } from "@nestjs/common";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { SigninUserDto } from "../users/dto/signin-user.dto";
import { Response } from "express";
import { CookieGetter } from "../common/decorators/cookie-getter.decorator";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("signup")
  signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @HttpCode(200)
  @Post("signin")
  signin(
    @Body() signinUserDto: SigninUserDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.singin(signinUserDto, res);
  }

  @HttpCode(200)
  @Post("singout")
  signout(
    @CookieGetter("refreshToken") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ){
    return this.authService.signout(refreshToken, res);
  }

  @HttpCode(200)
  @Post(":id/refresh")
  refresh(
    @Param("id", ParseIntPipe) id: number,
    @CookieGetter("refreshToken") refreshToken: string,
    @Res({passthrough: true}) res: Response
  ){
    return this.authService.refreshToken(id, refreshToken, res)
  }
}
