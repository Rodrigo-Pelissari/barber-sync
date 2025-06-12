import { User } from '../entities/user.entity';
import { Role } from '../enums/role.enum';

export class UserDto {
  id: string;
  name: string;
  cpf: string;
  email: string;
  phone: string;
  role: Role;

  constructor(entity: User) {
    this.id = entity.getId();
    this.name = entity.getName();
    this.cpf = entity.getCpf();
    this.email = entity.getEmail();
    this.phone = entity.getPhone();
    this.role = entity.getRole();
  }
}
