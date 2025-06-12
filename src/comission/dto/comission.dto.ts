import { UserDto } from 'src/user/dto/user.dto';
import { Comission } from '../entities/comission.entity';

export class ComissionDto {
  barber: UserDto;
  value: number;
  date: Date;

  constructor(entity: Comission) {
    this.barber = new UserDto(entity.getBarber());
    this.value = entity.getValue();
    this.date = entity.getDate();
  }
}
