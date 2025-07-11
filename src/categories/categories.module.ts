import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Categories } from './models/category.model';
import { AdminAuthModule } from '../admin-auth/admin-auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule.forFeature([Categories]), JwtModule],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
