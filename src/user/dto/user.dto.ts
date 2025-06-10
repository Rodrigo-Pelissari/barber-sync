import { Role } from '../enums/role.enum';

export class UserDto {
  id: string;
  name: string;
  cpf: string;
  email: string;
  phone: string;
  role: Role;

  constructor(
    id: string,
    name: string,
    cpf: string,
    email: string,
    phone: string,
    role: Role,
  ) {
    this.id = id;
    this.name = name;
    this.cpf = cpf;
    this.email = email;
    this.phone = phone;
    this.role = role;
  }
}
