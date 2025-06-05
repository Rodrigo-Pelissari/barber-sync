import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { Product } from '../entities/product.entity';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  public update(product: Product): void {
    if (this.name !== undefined) product.name = this.name;
    if (this.price !== undefined) product.price = this.price;
  }
}
