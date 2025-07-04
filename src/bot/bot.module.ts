import { Module } from '@nestjs/common';
import { BotService } from './bot.service';
import { BotUpdate } from './bot.update';
import { SequelizeModule } from '@nestjs/sequelize';
import { Bot } from './models/bot.model';
import { Library } from './models/library.model';
import { LibraryService } from './library/library.service';
import { LibraryUpdate } from './library/library.update';
// import { BookService } from '../book/book.service';
// import { BookUpdate } from './book/book.update';
import { Book } from './models/book.model';
import { BookModule } from '../book/book.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Bot, Library, Book]),
    // BookModule, 
  ],
  providers: [
    BotService,
    LibraryService,
    LibraryUpdate,
    // BookUpdate,
    BotUpdate,
  ],
  exports: [BotService],
})
export class BotModule {}
