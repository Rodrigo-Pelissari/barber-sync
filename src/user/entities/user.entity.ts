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
}
