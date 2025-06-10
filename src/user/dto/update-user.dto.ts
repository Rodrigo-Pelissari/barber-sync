import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { User } from '../entities/user.entity';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  public update(entity: User): void {
    if (this.name !== undefined) entity.name = this.name;
    if (this.cpf !== undefined) entity.cpf = this.cpf;
    if (this.email !== undefined) entity.email = this.email;
    if (this.phone !== undefined) entity.phone = this.phone;
    if (this.role !== undefined) entity.role = this.role;
  }
}
