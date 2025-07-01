import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class CreateBookVersionDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  bookId: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  languageId: number;

  @ApiProperty({ example: 'Atomic Habits' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'A practical guide to building good habits.' })
  @IsString()
  description: string;

  @ApiProperty({ example: 'https://example.com/book.txt' })
  @IsString()
  text_url: string;

  @ApiProperty({ example: 'https://example.com/cover.jpg' })
  @IsString()
  cover_url: string;
}
