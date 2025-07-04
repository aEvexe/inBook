import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { SubscriptionService } from './subscribtion.service';
import { CreateSubscriptionDto } from './dto/create-subscribtion.dto';
import { UpdateSubscriptionDto } from './dto/update-subscribtion.dto';


@Controller('subscription')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Post()
  create(@Body() dto: CreateSubscriptionDto) {
    return this.subscriptionService.create(dto);
  }

  @Get()
  findAll() {
    return this.subscriptionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subscriptionService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateSubscriptionDto) {
    return this.subscriptionService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subscriptionService.remove(+id);
  }
}
