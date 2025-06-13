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

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  usedValue: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  discount?: number;

  @Column('jsonb', { nullable: true })
  servicesQuantityMap: Record<string, number>;

  @ManyToOne(() => Schedule, { eager: true, cascade: true })
  @JoinColumn()
  usedServices: Schedule[];

  constructor(
    customer: User,
    grossValue: number,
    usedValue: number,
    servicesQuantityMap: Record<string, number>,
    usedServices: Schedule[],
    discount?: number,
  ) {
    this.customer = customer;
    this.grossValue = grossValue;
    this.usedValue = usedValue;
    this.servicesQuantityMap = servicesQuantityMap;
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

  public setDiscount(discount: number): void {
    this.discount = discount;
    this.setNetValue();
  }

  public setUsedServices(usedServices: Schedule[]): void {
    this.usedServices = usedServices;
  }

  public getId(): string {
    return this.id;
  }

  public getDiscount(): number | undefined {
    return this.discount;
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

  public setServicesQuantityMap(
    servicesQuantityMap: Record<string, number>,
  ): void {
    this.servicesQuantityMap = servicesQuantityMap;
  }

  public getServicesQuantityMap(): Record<string, number> {
    return this.servicesQuantityMap;
  }

  public getUsedServices(): Schedule[] {
    return this.usedServices;
  }

  public addUsedValue(value: number): void {
    this.usedValue += value;
  }

  public addUsedService(service: Schedule): void {
    this.usedServices.push(service);
    this.addUsedValue(service.getValue());
  }
}
