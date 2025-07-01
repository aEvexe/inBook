import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { BookVersionService } from './book-version.service';
import { CreateBookVersionDto } from './dto/create-book-version.dto';
import { UpdateBookVersionDto } from './dto/update-book-version.dto';
import { AdminGuard } from '../common/guards/admin.guard';

@Controller('book-version')
export class BookVersionController {
  constructor(private readonly bookVersionService: BookVersionService) {}

  @UseGuards(AdminGuard)
  @Post()
  create(@Body() createBookVersionDto: CreateBookVersionDto) {
    return this.bookVersionService.create(createBookVersionDto);
  }

  @Get()
  findAll() {
    return this.bookVersionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookVersionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookVersionDto: UpdateBookVersionDto) {
    return this.bookVersionService.update(+id, updateBookVersionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookVersionService.remove(+id);
  }
}
