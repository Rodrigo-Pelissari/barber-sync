import { IsString, IsNumber } from 'class-validator';
import { Product } from '../entities/product.entity';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsNumber()
  price: number;

  public toEntity(): Product {
    return new Product(this.name, this.price);
  }
}
