import { Module } from '@nestjs/common';
import { BookVersionService } from './book-version.service';
import { BookVersionController } from './book-version.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { BookVersion } from './models/book-version.model';
import { AdminAuthModule } from '../admin-auth/admin-auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[SequelizeModule.forFeature([BookVersion]), JwtModule],
  controllers: [BookVersionController],
  providers: [BookVersionService],
})
export class BookVersionModule {}
