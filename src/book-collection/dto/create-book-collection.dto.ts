import { IsInt } from 'class-validator';

export class CreateBookCollectionDto {
  @IsInt()
  bookId: number;

  @IsInt()
  collectionId: number;
}
