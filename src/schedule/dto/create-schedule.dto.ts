import { serviceType } from '../enums/serviceType.enum';
import { IsDateString, IsEnum, IsString } from 'class-validator';

export class CreateScheduleDto {
  @IsString()
  userName: string;

  @IsString()
  otherUserName: string;

  @IsEnum(serviceType)
  type: serviceType;

  @IsDateString()
  date: string;

  @IsString({ each: true })
  productsNames: string[];
}
