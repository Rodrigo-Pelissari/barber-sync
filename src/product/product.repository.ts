import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectRepository(Product)
    private readonly repository: Repository<Product>,
  ) {}

  async save(product: Product): Promise<Product> {
    return await this.repository.save(product);
  }

  async findAll(): Promise<Product[]> {
    return await this.repository.find();
  }

  async findById(id: string): Promise<Product | null> {
    return await this.repository.findOneBy({ id });
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
