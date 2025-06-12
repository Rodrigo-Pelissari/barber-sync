import { PartialType } from '@nestjs/mapped-types';
import { CreateScheduleDto } from './create-schedule.dto';
import { Schedule } from '../entities/schedule.entity';

export class UpdateScheduleDto extends PartialType(CreateScheduleDto) {
  public update(entity: Schedule): void {
    if (this.date !== undefined) entity.date = this.date;
    if (this.type !== undefined) entity.type = this.type;
  }
}
