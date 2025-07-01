import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AudioBookService } from './audio-book.service';
import { CreateAudioBookDto } from './dto/create-audio-book.dto';
import { UpdateAudioBookDto } from './dto/update-audio-book.dto';
import { AdminGuard } from '../common/guards/admin.guard';

@Controller('audio-book')
export class AudioBookController {
  constructor(private readonly audioBookService: AudioBookService) {}

  @UseGuards(AdminGuard)
  @Post()
  create(@Body() createAudioBookDto: CreateAudioBookDto) {
    return this.audioBookService.create(createAudioBookDto);
  }

  @Get()
  findAll() {
    return this.audioBookService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.audioBookService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAudioBookDto: UpdateAudioBookDto) {
    return this.audioBookService.update(+id, updateAudioBookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.audioBookService.remove(+id);
  }
}
