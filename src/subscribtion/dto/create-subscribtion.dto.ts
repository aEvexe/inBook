import { IsInt, IsDateString } from 'class-validator';

export class CreateSubscriptionDto {
  @IsInt()
  userId: number;

  @IsDateString()
  startDate: Date;

  @IsDateString()
  endDate: Date;
}
