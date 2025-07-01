import { Module } from '@nestjs/common';
import { AudioBookService } from './audio-book.service';
import { AudioBookController } from './audio-book.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { AudioBooks } from './models/audio-book.model';
import { AdminAuthModule } from '../admin-auth/admin-auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule.forFeature([AudioBooks]), JwtModule],
  controllers: [AudioBookController],
  providers: [AudioBookService],
})
export class AudioBookModule {}
