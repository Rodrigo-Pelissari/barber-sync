import { Product } from '../entities/product.entity';
import { ProductsType } from '../enums/productsType.enum';

export class ProductDto {
  public id: string;
  public type: ProductsType;
  public name: string;
  public price: number;

  constructor(entity: Product) {
    this.id = entity.id;
    this.type = entity.type;
    this.name = entity.name;
    this.price = entity.price;
  }
}
