import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class CreateAudioBookDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  bookversionId: number;

  @ApiProperty({ example: 'John Smith' })
  @IsString()
  narrator_name: string;

  @ApiProperty({ example: 3600 }) // duration in seconds
  @IsInt()
  total_duration: number;

  @ApiProperty({ example: 150 })
  @IsInt()
  total_size_mb: number;
}
