import { UserDto } from 'src/user/dto/user.dto';

export class ComissionDto {
  barber: UserDto;
  value: number;
  date: Date;

  constructor(barber: UserDto, value: number, date: Date) {
    this.barber = barber;
    this.value = value;
    this.date = date;
  }
}
