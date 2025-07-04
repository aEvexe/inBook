import { PartialType } from '@nestjs/swagger';
import { CreateBookmarkDto } from './create-book-mark.dto';

export class UpdateBookMarkDto extends PartialType(CreateBookmarkDto) {}
