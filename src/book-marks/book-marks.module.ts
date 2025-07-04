import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Bookmark } from './models/book-mark.model';
import { User } from '../users/models/user.model';
import { Book } from '../bot/models/book.model';
import { BookmarkController } from './book-marks.controller';
import { BookmarkService } from './book-marks.service';


@Module({
  imports: [SequelizeModule.forFeature([Bookmark, User, Book])],
  controllers: [BookmarkController],
  providers: [BookmarkService],
})
export class BookmarkModule {}
