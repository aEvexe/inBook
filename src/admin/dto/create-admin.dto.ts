import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsString, MinLength } from 'class-validator';

export class CreateAdminDto {
  @ApiProperty()
  @IsString()
  full_name: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty()
  @IsString()
  @MinLength(6)
  confirm_password: string;



  @ApiProperty()
  @IsBoolean()
  is_active: boolean;

  @ApiProperty()
  @IsBoolean()
  is_creator: boolean;
}
