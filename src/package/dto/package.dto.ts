import { ScheduleDto } from 'src/schedule/dto/schedule.dto';
import { UserDto } from 'src/user/dto/user.dto';
import { Package } from '../entities/package.entity';

export class PackageDto {
  id: string;
  customer: UserDto;
  grossValue: number;
  netValue: number;
  discount?: number;
  usedServices: ScheduleDto[];

  constructor(entity: Package) {
    this.id = entity.getId();
    this.customer = new UserDto(entity.getCustomer());
    this.grossValue = entity.getGrossValue();
    this.netValue = entity.getNetValue();
    this.discount = entity.getDiscount();
    this.usedServices = entity
      .getUsedServices()
      .map((schedule) => new ScheduleDto(schedule));
  }
}
