import { Product } from 'src/product/entities/product.entity';
import { Package } from './package.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm';

@Entity('package_products')
export class PackageProduct {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Package, (pkg) => pkg.packageProducts, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'package_id' })
  package: Package;

  @ManyToOne(() => Product, { eager: true })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column({ name: 'total_available', default: 0 })
  totalAvailableQuantity: number;

  @Column({ name: 'quantity_used', default: 0 })
  quantityUsed: number;

  @Column({ name: 'quantity_available', default: 0 })
  quantityAvailable: number;

  constructor(
    packageEntity: Package,
    productEntity: Product,
    totalAvailableQuantity: number,
    quantityUsed: number,
    quantityAvailable: number,
  ) {
    this.package = packageEntity;
    this.product = productEntity;
    this.totalAvailableQuantity = totalAvailableQuantity;
    this.quantityUsed = quantityUsed;
    this.quantityAvailable = quantityAvailable;
  }

  public getId(): string {
    return this.id;
  }

  public getPackage(): Package {
    return this.package;
  }

  public getProduct(): Product {
    return this.product;
  }

  public getQuantityAvailable(): number {
    return this.quantityAvailable;
  }

  public setQuantityAvailable(quantity: number): void {
    this.quantityAvailable = quantity;
  }

  public getQuantityUsed(): number {
    return this.quantityUsed;
  }

  public setQuantityUsed(quantity: number): void {
    this.quantityUsed = quantity;
  }

  public incrementQuantityUsed(): void {
    this.quantityUsed += 1;
  }
}
