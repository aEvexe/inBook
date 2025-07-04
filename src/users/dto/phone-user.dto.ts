import { IsEmail, IsNotEmpty, IsString, IsPhoneNumber, IsEnum, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PhoneUserDto {
  @ApiProperty()
  @IsPhoneNumber("UZ")
  phone: string;
}