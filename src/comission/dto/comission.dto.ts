import { User } from 'src/user/entities/user.entity';

export class ComissionDto {
  barber: User;
  value: number;
  date: Date;

  constructor(barber: User, value: number, date: Date) {
    this.barber = barber;
    this.value = value;
    this.date = date;
  }
}
