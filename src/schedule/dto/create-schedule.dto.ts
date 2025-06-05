import { Product } from 'src/product/entities/product.entity';
import { User } from 'src/user/entities/user.entity';
import { serviceType } from '../enums/serviceType.enum';
import { IsObject, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateScheduleDto {
  @IsObject()
  @ValidateNested()
  @Type(() => User)
  barber: User;

  @IsObject()
  @ValidateNested()
  @Type(() => User)
  customer: User;

  @IsObject()
  @ValidateNested()
  @Type(() => Date)
  date: Date;

  type: serviceType;

  @IsObject()
  @ValidateNested()
  @Type(() => Product)
  service: Product[];

  @IsObject()
  @ValidateNested()
  @Type(() => Number)
  value: number;
}
