import { Column, Entity } from 'typeorm';
import { Role } from '../enums/role.enum';

@Entity('users')
export class User {
  @Column({ primary: true, type: 'uuid' })
  id: string;

  @Column()
  name: string;

  @Column({ type: 'varchar', length: 11, unique: true })
  cpf: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar', unique: true })
  phone: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: Role })
  role: Role;

  constructor(
    name: string,
    cpf: string,
    email: string,
    phone: string,
    password: string,
    role: Role,
  ) {
    this.name = name;
    this.cpf = cpf;
    this.email = email;
    this.phone = phone;
    this.password = password;
    this.role = role;
  }

  public setName(name: string): void {
    this.name = name;
  }

  public setCpf(cpf: string): void {
    this.cpf = cpf;
  }

  public setEmail(email: string): void {
    this.email = email;
  }

  public setPhone(phone: string): void {
    this.phone = phone;
  }

  public setPassword(password: string): void {
    this.password = password;
  }

  public setRole(role: Role): void {
    this.role = role;
  }

  public getId(): string {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getCpf(): string {
    return this.cpf;
  }

  public getEmail(): string {
    return this.email;
  }

  public getPhone(): string {
    return this.phone;
  }

  public getPassword(): string {
    return this.password;
  }

  public getRole(): Role {
    return this.role;
  }
}
