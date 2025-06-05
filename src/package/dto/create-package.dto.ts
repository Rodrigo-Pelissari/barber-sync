import { Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsNumber,
  IsObject,
  ValidateNested,
} from 'class-validator';
import { Schedule } from 'src/schedule/entities/schedule.entity';
import { User } from 'src/user/entities/user.entity';
import { Package } from '../entities/package.entity';

export class CreatePackageDto {
  @IsObject()
  @ValidateNested()
  @Type(() => User)
  customer: User;

  @IsNumber()
  value: number;

  @IsInt()
  servicesQuantity: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Schedule)
  usedServices: Schedule[];

  public toEntity(): Package {
    return new Package(
      this.customer,
      this.value,
      this.servicesQuantity,
      this.usedServices,
    );
  }
}
