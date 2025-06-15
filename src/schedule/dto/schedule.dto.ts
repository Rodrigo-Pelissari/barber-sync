import { serviceType } from '../enums/serviceType.enum';
import { UserDto } from 'src/user/dto/user.dto';
import { ProductDto } from 'src/product/dto/product.dto';
import { Schedule } from '../entities/schedule.entity';

export class ScheduleDto {
  public id: string;
  public barber: UserDto;
  public customer: UserDto;
  public date: Date;
  public type: serviceType;
  public service: ProductDto[];
  public value: number;
  public concluded: boolean;

  constructor(entity: Schedule) {
    this.id = entity.getId();
    this.barber = new UserDto(entity.getBarber());
    this.customer = new UserDto(entity.getCustomer());
    this.date = entity.getDate();
    this.type = entity.getType();
    this.service = entity
      .getService()
      .map((product) => new ProductDto(product));
    this.value = entity.getValue();
    this.concluded = entity.getConcluded();
  }
}
