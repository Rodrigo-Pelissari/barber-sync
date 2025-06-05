import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  constructor(name: string, price: number) {
    this.name = name;
    this.price = price;
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
