import { IsString } from 'class-validator';
import { Role } from '../enums/role.enum';
import { User } from '../entities/user.entity';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsString()
  cpf: string;

  @IsString()
  email: string;

  @IsString()
  phone: string;

  @IsString()
  password: string;

  role: Role;

  public toEntity(): User {
    return new User(
      this.name,
      this.cpf,
      this.email,
      this.phone,
      this.password,
      this.role,
    );
  }
}
