import { PartialType } from '@nestjs/swagger';
import { CreateSubscriptionDto } from './create-subscribtion.dto';

export class UpdateSubscriptionDto extends PartialType(CreateSubscriptionDto) {}
