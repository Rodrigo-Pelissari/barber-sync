import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService {
  private readonly repository: ProductRepository;
  constructor(repository: ProductRepository) {
    this.repository = repository;
  }

  public async create(createProductDto: CreateProductDto): Promise<Product> {
    const entity = createProductDto.toEntity();
    return await this.repository.save(entity);
  }

  public async findAll(): Promise<Product[]> {
    return await this.repository.findAll();
  }

  public async findById(id: string): Promise<Product | null> {
    return await this.repository.findById(id);
  }

  public async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product | null> {
    const product = await this.repository.findById(id);

    if (!product)
      throw new NotFoundException(`Product with id ${id} not found`);

    updateProductDto.update(product);

    return await this.repository.save(product);
  }

  public async delete(id: string) {
    return await this.repository.delete(id);
  }
}
