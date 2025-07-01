import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class CreateAudioPartDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  audiobookId: number;

  @ApiProperty({ example: 'Chapter 1: Introduction' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'https://example.com/audio1.mp3' })
  @IsString()
  file_url: string;

  @ApiProperty({ example: 300 }) // seconds
  @IsInt()
  duration: number;

  @ApiProperty({ example: 10 })
  @IsInt()
  size_mb: number;

  @ApiProperty({ example: 1 }) // Order of chapter
  @IsInt()
  order_index: number;
}
