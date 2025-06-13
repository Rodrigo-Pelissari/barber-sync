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
  grossValue: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  netValue: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  discount?: number;

  @Column({ type: 'int' })
  servicesQuantity: number;

  @ManyToOne(() => Schedule, { eager: true, cascade: true })
  @JoinColumn()
  usedServices: Schedule[];

  constructor(
    customer: User,
    grossValue: number,
    servicesQuantity: number,
    usedServices: Schedule[],
    discount?: number,
  ) {
    this.customer = customer;
    this.grossValue = grossValue;
    this.servicesQuantity = servicesQuantity;
    this.usedServices = usedServices;
    this.discount = discount;
  }

  public setCustomer(customer: User): void {
    this.customer = customer;
  }

  public setGrossValue(grossValue: number): void {
    this.grossValue = grossValue;
  }

  public setNetValue(): void {
    this.netValue = this.grossValue - this.discount || 0;
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

  public getGrossValue(): number {
    return this.grossValue;
  }

  public getNetValue(): number {
    return this.netValue;
  }

  public getServicesQuantity(): number {
    return this.servicesQuantity;
  }

  public getUsedServices(): Schedule[] {
    return this.usedServices;
  }
}
