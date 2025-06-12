import { User } from 'src/user/entities/user.entity';
import { Comission } from '../entities/comission.entity';

export class CreateComissionDto {
  barber: User;
  value: number;
  date: Date;

  constructor(barber: User, value: number, date: Date) {
    this.barber = barber;
    this.value = value;
    this.date = date;
  }

  public toEntity(): Comission {
    return new Comission(this.barber, this.value, this.date);
  }
}
