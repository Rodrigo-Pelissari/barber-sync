import { Product } from 'src/product/entities/product.entity';
import { User } from 'src/user/entities/user.entity';
import { serviceType } from '../enums/serviceType.enum';
import { IsNumber, IsObject, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { Schedule } from '../entities/schedule.entity';

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

  @IsNumber()
  value: number;

  @IsString({ each: true })
  productsNames: string[];

  public toEntity(): Schedule {
    return new Schedule(
      this.barber,
      this.customer,
      this.date,
      this.type,
      this.service,
      this.value,
    );
  }
}
