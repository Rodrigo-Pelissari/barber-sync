import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { ProductsType } from './enums/productsType.enum';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectRepository(Product)
    private readonly repository: Repository<Product>,
  ) {}

  async save(entity: Product): Promise<Product> {
    return await this.repository.save(entity);
  }

  async findAll(): Promise<Product[]> {
    return await this.repository.find();
  }

  async findAllByType(type: ProductsType): Promise<Product[]> {
    return await this.repository.find({ where: { type } });
  }

  async findById(id: string): Promise<Product | null> {
    return await this.repository.findOneBy({ id });
  }

  async findByName(name: string): Promise<Product | null> {
    return await this.repository.findOneBy({ name });
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  public async merge(
    target: Product,
    source: Partial<Product>,
  ): Promise<Product> {
    return this.repository.merge(target, source);
  }
}
