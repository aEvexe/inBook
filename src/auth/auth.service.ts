import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  BadRequestException,
  ForbiddenException,
  NotFoundException
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "../users/models/user.model";
import { Response } from "express";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { UsersService } from "../users/users.service";
import * as bcrypt from "bcrypt";
import { SigninUserDto } from "../users/dto/signin-user.dto";
import { MailService } from "../mail/mail.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly mailService: MailService
  ) {}

  async generateToken(user: User) {
    const payload = {
      id: user.id,
      is_active: user.is_active,
      is_premium: user.is_premium,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCES_TOKEN_KEY,
        expiresIn: process.env.ACCES_TOKEN_TIME,
      }),

      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async register(createUserDto: CreateUserDto) {
    const user = await this.usersService.findUserByEmail(createUserDto.email);

    if (user) {
      throw new ConflictException("this user exists");
    }
    const newUser = await this.usersService.create(createUserDto);
    // sendMail
    try {
      await this.mailService.sendMail(newUser);
    } catch (error) {
      console.log(error);
    }
    return newUser;
  }

  async singin(signinUserDto: SigninUserDto, res: Response) {
    const user = await this.usersService.findUserByEmail(signinUserDto.email);

    if (!user) {
      throw new UnauthorizedException("Email yoki password noto'g'ri");
    }

    const isMatched = await bcrypt.compare(
      signinUserDto.password,
      user.password
    );

    if (!isMatched) {
      throw new UnauthorizedException("Email yoki password noto'g'ri");
    }

    const { accessToken, refreshToken } = await this.generateToken(user);
    user.refresh_token = await bcrypt.hash(refreshToken, 7);
    user.save();

    res.cookie("refreshToken", refreshToken, {
      maxAge: +process.env.COOKIE_TIME!,
      httpOnly: true,
    });

    return { message: "Tizimga xush kelibsiz", id: user.id, accessToken };
  }

  async signout(refreshToken: string, res: Response){
    let userData: any;
    
    try {
      userData = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });
    } catch (error) {
      console.log(error)
      throw new BadRequestException(error)
    }
    if(!userData){
      throw new ForbiddenException("User not verified")
    }

    await this.usersService.updateRefreshToken(userData.id, "");

    res.clearCookie("refreshToken");
    return{
      message: "User Logged out succesfully",
    }
  }

  async refreshToken(
    userId: number,
    refreshTokenFromCookie: string,
    res: Response
  ){
    const decodedToken = await this.jwtService.decode(refreshTokenFromCookie);
    console.log(userId) 
    console.log(decodedToken["id"]);

    if(userId !== decodedToken["id"]){
      throw new ForbiddenException("Not allowed");
    }
    const user = await this.usersService.findOne(userId);

    if(!user || !user.refresh_token){
      throw new NotFoundException("user not found");
    }

    const tokenMatch = await bcrypt.compare(
      refreshTokenFromCookie,
      user.refresh_token
    );

    if(!tokenMatch){
      throw new ForbiddenException("Forbidden")
    }

    const { accessToken, refreshToken} = await this.generateToken(user);

    const refresh_token = await bcrypt.hash(refreshToken, 7);
    await this.usersService.updateRefreshToken(user.id, refresh_token);

    res.cookie("refreshToken", refreshToken, {
      maxAge: Number(process.env.COOKIE_TIME),
      httpOnly: true,
    });

    const response = {
      message: "User refreshed",
      userId: user.id,
      accessToken: accessToken,
    }
    return response
  }
}
