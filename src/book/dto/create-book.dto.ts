import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateBookDto {
  @ApiProperty({ example: '2023-10-01' })
  @IsDateString()
  published_year: Date;

  @ApiProperty({ example: 1 })
  @IsInt()
  authorId: number;

  @ApiProperty({ example: 'https://example.com/cover.jpg', required: false })
  @IsOptional()
  @IsString()
  image?: string;
}
