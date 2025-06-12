import { ScheduleDto } from 'src/schedule/dto/schedule.dto';
import { UserDto } from 'src/user/dto/user.dto';

export class PackageDto {
  id: string;
  customer: UserDto;
  value: number;
  servicesQuantity: number;
  usedServices: ScheduleDto[];

  constructor(
    id: string,
    customer: UserDto,
    value: number,
    servicesQuantity: number,
    usedServices: ScheduleDto[],
  ) {
    this.id = id;
    this.customer = customer;
    this.value = value;
    this.servicesQuantity = servicesQuantity;
    this.usedServices = usedServices;
  }
}
