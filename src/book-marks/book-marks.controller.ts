import { Controller, Get, Post, Put, Delete, Body, Query } from '@nestjs/common';
import { BookmarkService } from './book-marks.service';
import { CreateBookmarkDto } from './dto/create-book-mark.dto';
import { UpdateBookMarkDto } from './dto/update-book-mark.dto';


@Controller('bookmarks')
export class BookmarkController {
  constructor(private readonly service: BookmarkService) {}

  @Post()
  create(@Body() dto: CreateBookmarkDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get('find')
  findOne(@Query('userId') userId: number, @Query('bookId') bookId: number) {
    return this.service.findOne(+userId, +bookId);
  }

  @Put()
  update(
    @Query('userId') userId: number,
    @Query('bookId') bookId: number,
    @Body() dto: UpdateBookMarkDto,
  ) {
    return this.service.update(+userId, +bookId, dto);
  }

  @Delete()
  remove(@Query('userId') userId: number, @Query('bookId') bookId: number) {
    return this.service.remove(+userId, +bookId);
  }
}
