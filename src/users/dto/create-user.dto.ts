import { IsEmail, IsNotEmpty, IsString, IsPhoneNumber, IsEnum, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  full_name: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  confirm_password: string;

  @ApiProperty()
  @IsPhoneNumber()
  phone: string;

  @ApiProperty({ enum: ["Male", "Female"] })
  @IsEnum(["Male", "Female"])
  gender: string;

  @ApiProperty()
  @IsInt()
  birth_year: number;
}