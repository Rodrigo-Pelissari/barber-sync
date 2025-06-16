import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PackageProduct } from './entities/package-product.entity';

@Injectable()
export class PackageProductRepository {
  constructor(
    @InjectRepository(PackageProduct)
    private readonly repository: Repository<PackageProduct>,
  ) {}

  public async save(packageProduct: PackageProduct): Promise<PackageProduct> {
    return this.repository.save(packageProduct);
  }

  public async findById(id: string): Promise<PackageProduct | null> {
    return this.repository.findOne({
      where: { id },
      relations: {
        package: true,
        product: true,
      },
    });
  }

  public async findAll(): Promise<PackageProduct[]> {
    return this.repository.find({
      relations: {
        package: true,
        product: true,
      },
    });
  }

  public async findAllByPackageId(
    packageId: string,
  ): Promise<PackageProduct[]> {
    return this.repository.find({
      where: { package: { id: packageId } },
      relations: {
        package: true,
        product: true,
      },
    });
  }

  public async deleteById(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  public async merge(
    target: PackageProduct,
    source: Partial<PackageProduct>,
  ): Promise<PackageProduct> {
    return this.repository.merge(target, source);
  }
}
