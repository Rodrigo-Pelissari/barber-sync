import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { serviceType } from '../enums/serviceType.enum';
import { Product } from 'src/product/entities/product.entity';

@Entity('schedules')
export class Schedule {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.barberSchedules, { eager: true })
  @JoinColumn({ name: 'barberId' })
  barber: User;

  @ManyToOne(() => User, (user) => user.customerSchedules, { eager: true })
  @JoinColumn({ name: 'customerId' })
  customer: User;

  @Column({ type: 'timestamp' })
  date: Date;

  @Column({ type: 'enum', enum: serviceType })
  type: serviceType;

  @ManyToOne(() => Product, { eager: true, cascade: true })
  @JoinColumn()
  service: Product[];

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  value: number;

  @Column()
  concluded: boolean;

  constructor(
    barber: User,
    customer: User,
    date: Date,
    type: serviceType,
    service: Product[],
    value: number,
  ) {
    this.barber = barber;
    this.customer = customer;
    this.date = date;
    this.type = type;
    this.service = service;
    this.value = value;
  }

  public setBarber(barber: User): void {
    this.barber = barber;
  }

  public getBarber(): User {
    return this.barber;
  }

  public setCustomer(customer: User): void {
    this.customer = customer;
  }

  public getCustomer(): User {
    return this.customer;
  }

  public setDate(date: Date): void {
    this.date = date;
  }

  public setConcluded(concluded: boolean): void {
    this.concluded = concluded;
  }

  public getDate(): Date {
    return this.date;
  }

  public setType(type: serviceType): void {
    this.type = type;
  }

  public getId(): string {
    return this.id;
  }

  public getType(): serviceType {
    return this.type;
  }

  public setService(service: Product[]): void {
    this.service = service;
  }

  public getService(): Product[] {
    return this.service;
  }

  public setValue(value: number): void {
    this.value = value;
  }

  public getValue(): number {
    return this.value;
  }

  public setProducts(products: Product[]): void {
    this.service = products;
  }

  public getProducts(): Product[] {
    return this.service;
  }

  public getConcluded(): boolean {
    return this.concluded;
  }

  public addProduct(product: Product): void {
    if (!this.service) {
      this.service = [];
    }
    this.service.push(product);
  }

  public removeProduct(productId: string): void {
    if (this.service) {
      this.service = this.service.filter((product) => product.id !== productId);
    }
  }
}
