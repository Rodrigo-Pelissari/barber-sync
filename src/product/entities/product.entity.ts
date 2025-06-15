import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ProductsType } from '../enums/productsType.enum';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    transformer: {
      to: (value: number) => value,
      from: (value: string): number => parseFloat(value),
    },
  })
  price: number;

  @Column({ type: 'enum', enum: ProductsType, default: ProductsType.SERVICE })
  type: ProductsType;

  constructor(name: string, price: number, type: ProductsType) {
    this.name = name;
    this.price = price;
    this.type = type;
  }

  public setName(name: string): void {
    this.name = name;
  }

  public getName(): string {
    return this.name;
  }

  public setPrice(price: number): void {
    this.price = price;
  }

  public getPrice(): number {
    return this.price;
  }

  public getId(): string {
    return this.id;
  }
}
