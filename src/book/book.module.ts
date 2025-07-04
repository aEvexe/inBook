import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Book } from './models/book.model';
import { AdminAuthModule } from '../admin-auth/admin-auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule.forFeature([Book]), JwtModule],
  controllers: [BookController],
  providers: [BookService],
  exports: [BookService]
})
export class BookModule {}
