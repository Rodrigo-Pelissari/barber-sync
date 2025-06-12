import { serviceType } from '../enums/serviceType.enum';
import { IsString } from 'class-validator';

export class CreateScheduleDto {
  type: serviceType;

  date: Date;

  @IsString({ each: true })
  productsNames: string[];
}
