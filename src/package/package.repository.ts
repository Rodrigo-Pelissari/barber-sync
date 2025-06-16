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

  public async save(packageEntity: Package): Promise<Package> {
    return this.repository.save(packageEntity);
  }

  public async findById(id: string): Promise<Package | null> {
    return this.repository.findOne({
      where: { id },
      relations: {
        customer: true,
        packageProducts: {
          product: true,
        },
      },
    });
  }

  public async findByUserId(userId: string): Promise<Package | null> {
    return this.repository.findOne({
      where: { customer: { id: userId } },
      relations: {
        customer: true,
        packageProducts: {
          product: true,
        },
      },
    });
  }

  public async findByUserName(userName: string): Promise<Package | null> {
    return this.repository.findOne({
      where: { customer: { name: userName } },
      relations: {
        customer: true,
        packageProducts: {
          product: true,
        },
      },
    });
  }

  public async findAll(): Promise<Package[]> {
    return this.repository.find({
      relations: {
        customer: true,
        packageProducts: {
          product: true,
        },
      },
    });
  }

  public async deleteById(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  public async merge(
    target: Package,
    source: Partial<Package>,
  ): Promise<Package> {
    return this.repository.merge(target, source);
  }
}
