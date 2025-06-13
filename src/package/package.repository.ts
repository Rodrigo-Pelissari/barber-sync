import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Package } from './entities/package.entity';

@Injectable()
export class PackageRepository {
  constructor(
    @InjectRepository(Package)
    private readonly repository: Repository<Package>,
  ) {}

  async save(entity: Package): Promise<Package> {
    return await this.repository.save(entity);
  }

  async findAll(): Promise<Package[]> {
    return await this.repository.find();
  }

  async findById(id: string): Promise<Package | null> {
    return await this.repository.findOneBy({ id });
  }

  public async findByCustomerId(customerId: string): Promise<Package | null> {
    return await this.repository.findOne({
      where: { customer: { id: customerId } },
      relations: ['customer', 'usedServices'],
    });
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  public async merge(
    target: Package,
    source: Partial<Package>,
  ): Promise<Package> {
    return this.repository.merge(target, source);
  }
}
