import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateBookmarkDto {
  @IsInt()
  userId: number;

  @IsInt()
  bookId: number;

  @IsOptional()
  @IsString()
  note: string;

  @IsInt()
  position: number;
}
