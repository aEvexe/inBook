import { Module } from '@nestjs/common';
import { AudioPartsService } from './audio-parts.service';
import { AudioPartsController } from './audio-parts.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { AudioParts } from './models/audio-part.model';
import { AdminAuthModule } from '../admin-auth/admin-auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[SequelizeModule.forFeature([AudioParts]), JwtModule],
  controllers: [AudioPartsController],
  providers: [AudioPartsService],
})
export class AudioPartsModule {}
