import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Subscription } from './models/subscribtion.model';
import { CreateSubscriptionDto } from './dto/create-subscribtion.dto';
import { UpdateSubscriptionDto } from './dto/update-subscribtion.dto';


@Injectable()
export class SubscriptionService {
  constructor(@InjectModel(Subscription) private subRepo: typeof Subscription) {}

  async create(dto: CreateSubscriptionDto) {
    return this.subRepo.create(dto);
  }

  async findAll() {
    return this.subRepo.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const subscription = await this.subRepo.findByPk(id, { include: { all: true } });
    if (!subscription) throw new NotFoundException('Subscription not found');
    return subscription;
  }

  async update(id: number, dto: UpdateSubscriptionDto) {
    const subscription = await this.findOne(id);
    return subscription.update(dto);
  }

  async remove(id: number) {
    const subscription = await this.findOne(id);
    await subscription.destroy();
    return { message: 'Deleted successfully' };
  }
}
