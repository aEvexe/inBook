import { Injectable } from '@nestjs/common';
import {
  ConflictException,
  UnauthorizedException,
} from "@nestjs/common";
import { Response } from "express";
import { JwtService } from '@nestjs/jwt';
import { AdminService } from '../admin/admin.service';
import { Admin } from '../admin/models/admin.model';
import { CreateAdminDto } from '../admin/dto/create-admin.dto';
import { SigninAdminDto } from '../admin/dto/signin-admin.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminAuthService {
    constructor(
    private readonly jwtService: JwtService,
    private readonly adminService: AdminService
    ){}

    async generateToken(admin: Admin) {
    const payload = {
      id: admin.id,
      is_active: admin.is_active,
      is_creator: admin.is_creator,
      is_admin: true,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ADMIN_ACCES_TOKEN_KEY,
        expiresIn: process.env.ADMIN_ACCES_TOKEN_TIME,
      }),

      this.jwtService.signAsync(payload, {
        secret: process.env.ADMIN_REFRESH_TOKEN_KEY,
        expiresIn: process.env.ADMIN_REFRESH_TOKEN_TIME,
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async register(createAdminDto: CreateAdminDto) {
    const admin = await this.adminService.findUserByEmail(createAdminDto.email);

    if (admin) {
      throw new ConflictException("this admin exists");
    }
    const newUser = await this.adminService.create(createAdminDto);
    // sendMail
    // try {
    //   await this.mailService.sendMail(newUser);
    // } catch (error) {
    //   console.log(error);
    // }
    return newUser;
  }

  async singin(signinAdminDto: SigninAdminDto, res: Response) {
    const admin = await this.adminService.findUserByEmail(signinAdminDto.email);

    if (!admin) {
      throw new UnauthorizedException("Email yoki password noto'g'ri");
    }

    const isMatched = await bcrypt.compare(
      signinAdminDto.password,
      admin.password
    );

    if (!isMatched) {
      throw new UnauthorizedException("Email yoki password noto'g'ri");
    }

    const { accessToken, refreshToken } = await this.generateToken(admin);
    admin.refresh_token = await bcrypt.hash(refreshToken, 7);
    admin.save();

    res.cookie("refreshToken", refreshToken, {
      maxAge: +process.env.COOKIE_TIME!,
      httpOnly: true,
    });

    return { message: "Tizimga xush kelibsiz", id: admin.id, accessToken };
  }

  async signout(refreshToken: string, res: Response) {
  res.clearCookie('refreshToken');
  return { message: 'Admin signed out' };
}


  async refreshToken(id: number, refreshToken: string, res: Response) {
  const admin = await this.adminService.findOne(id);
  if (!admin || !admin.refresh_token) {
    throw new UnauthorizedException('Admin not found or no refresh token');
  }

  const isMatch = await bcrypt.compare(refreshToken, admin.refresh_token);
  if (!isMatch) {
    throw new UnauthorizedException('Invalid refresh token');
  }

  const tokens = await this.generateToken(admin);
  admin.refresh_token = await bcrypt.hash(tokens.refreshToken, 7);
  await admin.save();

  res.cookie('refreshToken', tokens.refreshToken, {
    maxAge: +process.env.COOKIE_TIME!,
    httpOnly: true,
  });

  return { id: admin.id, accessToken: tokens.accessToken };
}


}
