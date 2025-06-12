import { ScheduleDto } from 'src/schedule/dto/schedule.dto';
import { UserDto } from 'src/user/dto/user.dto';
import { Package } from '../entities/package.entity';

export class PackageDto {
  id: string;
  customer: UserDto;
  value: number;
  servicesQuantity: number;
  usedServices: ScheduleDto[];

  constructor(entity: Package) {
    this.id = entity.getId();
    this.customer = new UserDto(entity.getCustomer());
    this.value = entity.getValue();
    this.servicesQuantity = entity.getServicesQuantity();
    this.usedServices = entity
      .getUsedServices()
      .map((schedule) => new ScheduleDto(schedule));
  }
}
