import { IsBoolean, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateCollectionDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  coverImageUrl: string;

  @IsInt()
  userId: number;

  @IsBoolean()
  isPublic: boolean;

  @IsBoolean()
  isPremium: boolean;
}
