import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class CreateAuthorDto {
  @ApiProperty()
  @IsString()
  full_name: string;

  @ApiProperty()
  @IsString()
  bio: string;

  @ApiProperty()
  @IsString()
  photo_url: string;
}
