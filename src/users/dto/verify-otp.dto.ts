import { IsEmail, IsNotEmpty, IsString, IsPhoneNumber, IsEnum, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class VerifyOtpDto {
  @ApiProperty()
  @IsPhoneNumber("UZ")
  phone: string;

  @ApiProperty()
  otp: string

  @ApiProperty()
  verification_key: string;
}