import { serviceType } from '../enums/serviceType.enum';
import { UserDto } from 'src/user/dto/user.dto';
import { ProductDto } from 'src/product/dto/product.dto';

export class ScheduleDto {
  public id: string;
  public barber: UserDto;
  public customer: UserDto;
  public date: Date;
  public type: serviceType;
  public service: ProductDto[];
  public value: number;

  constructor(
    id: string,
    barber: UserDto,
    customer: UserDto,
    date: Date,
    type: serviceType,
    service: ProductDto[],
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
