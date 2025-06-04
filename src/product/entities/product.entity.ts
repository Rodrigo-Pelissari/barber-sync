import { Column, Entity } from 'typeorm';

@Entity('products')
export class Product {
  @Column({ primary: true, type: 'uuid' })
  id: string;

  @Column()
  name: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;
}
