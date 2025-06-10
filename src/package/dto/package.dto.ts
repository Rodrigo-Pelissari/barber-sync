import { Schedule } from 'src/schedule/entities/schedule.entity';

export class PackageDto {
  id: string;
  customer: string;
  value: number;
  servicesQuantity: number;
  usedServices: Schedule[];

  constructor(
    id: string,
    customer: string,
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
