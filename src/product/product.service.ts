import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductRepository } from './product.repository';
import { ProductDto } from './dto/product.dto';

@Injectable()
export class ProductService {
  constructor(private readonly repository: ProductRepository) {}

  public async create(createProductDto: CreateProductDto): Promise<ProductDto> {
    const entity = createProductDto.toEntity();
    await this.repository.save(entity);
    return new ProductDto(entity);
  }

  public async findAll(): Promise<ProductDto[]> {
    const products = await this.repository.findAll();
    return products.map((product) => new ProductDto(product));
  }

  public async findById(id: string): Promise<ProductDto | null> {
    const product = await this.repository.findById(id);
    return product ? new ProductDto(product) : null;
  }

  public async findByName(name: string): Promise<ProductDto | null> {
    const product = await this.repository.findByName(name);
    return product ? new ProductDto(product) : null;
  }

  public async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<ProductDto | null> {
    const product = await this.repository.findById(id);

    if (!product)
      throw new NotFoundException(`Product with id ${id} not found`);

    const updatedProduct = await this.repository.merge(
      product,
      updateProductDto,
    );

    await this.repository.save(updatedProduct);
    return new ProductDto(updatedProduct);
  }

  public async delete(id: string) {
    return await this.repository.delete(id);
  }
}
