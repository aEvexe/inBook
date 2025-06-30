import { Module } from '@nestjs/common';
import { LanguagesService } from './languages.service';
import { LanguagesController } from './languages.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Languages } from './models/language.model';

@Module({
  imports:[SequelizeModule.forFeature([Languages])],
  controllers: [LanguagesController],
  providers: [LanguagesService],
})
export class LanguagesModule {}
