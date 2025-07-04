import { Controller, Post, Body, Delete, Get, Query } from '@nestjs/common';
import { BookCollectionService } from './book-collection.service';
import { CreateBookCollectionDto } from './dto/create-book-collection.dto';

@Controller('book-collections')
export class BookCollectionController {
  constructor(private readonly service: BookCollectionService) {}

  @Post()
  create(@Body() dto: CreateBookCollectionDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Delete()
  remove(@Query('bookId') bookId: number, @Query('collectionId') collectionId: number) {
    return this.service.remove(bookId, collectionId);
  }
}
