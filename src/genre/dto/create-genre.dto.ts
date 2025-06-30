import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class CreateGenreDto {
  @ApiProperty({ example: 'Fantasy', description: 'Genre name' })
  @IsString()
  @Length(2, 100)
  name: string;
}
