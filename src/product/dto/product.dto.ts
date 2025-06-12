import { Product } from '../entities/product.entity';

export class ProductDto {
  public id: string;
  public name: string;
  public price: number;

  constructor(entity: Product) {
    this.id = entity.id;
    this.name = entity.name;
    this.price = entity.price;
  }
}
