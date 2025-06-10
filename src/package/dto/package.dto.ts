import { Schedule } from 'src/schedule/entities/schedule.entity';
import { User } from 'src/user/entities/user.entity';

export class PackageDto {
  id: string;
  customer: User;
  value: number;
  servicesQuantity: number;
  usedServices: Schedule[];

  constructor(
    id: string,
    customer: User,
    value: number,
    servicesQuantity: number,
    usedServices: Schedule[],
  ) {
    this.id = id;
    this.customer = customer;
    this.value = value;
    this.servicesQuantity = servicesQuantity;
    this.usedServices = usedServices;
  }
}
