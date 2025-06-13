import { IsString, IsNumber } from 'class-validator';
import { Product } from '../entities/product.entity';
import { ProductsType } from '../enums/productsType.enum';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsNumber()
  price: number;

  type: ProductsType;

  public toEntity(): Product {
    return new Product(this.name, this.price, this.type);
  }
}
