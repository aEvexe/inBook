import { Module } from '@nestjs/common';
import { SubscriptionService } from './subscribtion.service';
import { SubscriptionController } from './subscribtion.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Subscription } from './models/subscribtion.model';

@Module({
  imports: [SequelizeModule.forFeature([Subscription])],
  controllers: [SubscriptionController],
  providers: [SubscriptionService],
})
export class SubscribtionModule {}
