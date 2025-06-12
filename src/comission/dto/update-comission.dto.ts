import { PartialType } from '@nestjs/mapped-types';
import { CreateComissionDto } from './create-comission.dto';
import { Comission } from '../entities/comission.entity';

export class UpdateComissionDto extends PartialType(CreateComissionDto) {
  public update(entity: Comission): void {
    if (this.barber !== undefined) entity.barber = this.barber;
    if (this.value !== undefined) entity.value = this.value;
    if (this.date !== undefined) entity.date = this.date;
  }
}
