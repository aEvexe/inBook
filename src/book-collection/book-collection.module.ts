import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { BookCollection } from './models/book-collection.model';
import { BookCollectionService } from './book-collection.service';
import { BookCollectionController } from './book-collection.controller';
import { Book } from '../bot/models/book.model';
import { Collection } from '../collections/models/collection.model';

@Module({
  imports: [SequelizeModule.forFeature([BookCollection, Book, Collection])],
  providers: [BookCollectionService],
  controllers: [BookCollectionController],
})
export class BookCollectionModule {}
