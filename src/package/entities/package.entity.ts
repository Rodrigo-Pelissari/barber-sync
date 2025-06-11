import { Schedule } from 'src/schedule/entities/schedule.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('packages')
export class Package {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User, { eager: true, cascade: true })
  @JoinColumn()
  customer: User;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  value: number;

  @Column({ type: 'int' })
  servicesQuantity: number;

  @ManyToOne(() => Schedule, { eager: true, cascade: true })
  @JoinColumn()
  usedServices: Schedule[];

  constructor(
    customer: User,
    value: number,
    servicesQuantity: number,
    usedServices: Schedule[],
  ) {
    this.customer = customer;
    this.value = value;
    this.servicesQuantity = servicesQuantity;
    this.usedServices = usedServices;
  }

  public setCustomer(customer: User): void {
    this.customer = customer;
  }

  public setValue(value: number): void {
    this.value = value;
  }

  public setServicesQuantity(servicesQuantity: number): void {
    this.servicesQuantity = servicesQuantity;
  }

  public setUsedServices(usedServices: Schedule[]): void {
    this.usedServices = usedServices;
  }

  public getId(): string {
    return this.id;
  }

  public getCustomer(): User {
    return this.customer;
  }

  public getValue(): number {
    return this.value;
  }

  public getServicesQuantity(): number {
    return this.servicesQuantity;
  }

  public getUsedServices(): Schedule[] {
    return this.usedServices;
  }
}
