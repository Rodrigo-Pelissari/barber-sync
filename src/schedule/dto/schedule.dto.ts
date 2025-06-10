import { Product } from 'src/product/entities/product.entity';
import { User } from 'src/user/entities/user.entity';
import { serviceType } from '../enums/serviceType.enum';

export class ScheduleDto {
  public id: string;
  public barber: User;
  public customer: User;
  public date: Date;
  public type: serviceType;
  public service: Product[];
  public value: number;

  constructor(
    id: string,
    barber: User,
    customer: User,
    date: Date,
    type: serviceType,
    service: Product[],
    value: number,
  ) {
    this.id = id;
    this.barber = barber;
    this.customer = customer;
    this.date = date;
    this.type = type;
    this.service = service;
    this.value = value;
  }
}
