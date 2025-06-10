import { PartialType } from '@nestjs/mapped-types';
import { CreateScheduleDto } from './create-schedule.dto';
import { Schedule } from '../entities/schedule.entity';

export class UpdateScheduleDto extends PartialType(CreateScheduleDto) {
  public update(entity: Schedule): void {
    if (this.customer !== undefined) entity.customer = this.customer;
    if (this.date !== undefined) entity.date = this.date;
    if (this.type !== undefined) entity.type = this.type;
    if (this.service !== undefined) entity.service = this.service;
    if (this.value !== undefined) entity.value = this.value;
    if (this.barber !== undefined) entity.barber = this.barber;
  }
}
