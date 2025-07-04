import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Collection } from './models/collection.model';
import { User } from '../users/models/user.model';
import { CollectionController } from './collections.controller';
import { CollectionService } from './collections.service';

@Module({
  imports: [SequelizeModule.forFeature([Collection, User])],
  controllers: [CollectionController],
  providers: [CollectionService],
})
export class CollectionModule {}
