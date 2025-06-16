import { Schedule } from 'src/schedule/entities/schedule.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PackageProduct } from './package-product.entity';

@Entity('packages')
export class Package {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User, { eager: true, cascade: true })
  @JoinColumn()
  customer: User;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    transformer: {
      to: (value: number) => value,
      from: (value: string): number => parseFloat(value),
    },
  })
  grossValue: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    transformer: {
      to: (value: number) => value,
      from: (value: string): number => parseFloat(value),
    },
  })
  netValue: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    transformer: {
      to: (value: number) => value,
      from: (value: string): number => parseFloat(value),
    },
  })
  usedValue: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
    transformer: {
      to: (value: number) => value,
      from: (value: string): number => parseFloat(value),
    },
  })
  discount?: number;

  @OneToMany(() => PackageProduct, (packageProduct) => packageProduct.package, {
    eager: true,
    cascade: true,
  })
  packageProducts: PackageProduct[];

  @ManyToOne(() => Schedule, { eager: true, cascade: true })
  @JoinColumn()
  usedServices: Schedule[];

  @Column()
  isActive: boolean;

  constructor(
    customer: User,
    grossValue: number,
    isActive: boolean,
    discount?: number,
  ) {
    this.customer = customer;
    this.grossValue = grossValue;
    this.isActive = isActive;
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

  public setPackageProducts(packageProducts: PackageProduct[]): void {
    this.packageProducts = packageProducts;
  }

  public setUsedValue(usedValue: number): void {
    this.usedValue = usedValue;
  }

  public getId(): string {
    return this.id;
  }

  public getDiscount(): number | undefined {
    return this.discount;
  }

  public getPackageProducts(): PackageProduct[] {
    return this.packageProducts;
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

  public getUsedServices(): Schedule[] {
    return this.usedServices;
  }

  public getUsedValue(): number {
    return this.usedValue;
  }

  public addUsedValue(value: number): void {
    this.usedValue += value;
  }

  public addUsedService(service: Schedule): void {
    this.usedServices.push(service);
    this.addUsedValue(service.getValue());
  }
}
