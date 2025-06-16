import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePackageDto } from './dto/create-package.dto';
import { UpdatePackageDto } from './dto/update-package.dto';
import { PackageDto } from './dto/package.dto';
import { PackageRepository } from './package.repository';
import { Package } from './entities/package.entity';
import { ProductRepository } from 'src/product/product.repository';
import { UserService } from 'src/user/user.service';
import { PackageProductRepository } from './package-product.repository';
import { ProductsType } from 'src/product/enums/productsType.enum';
import { PackageProduct } from './entities/package-product.entity';

@Injectable()
export class PackageService {
  pkg: any;
  constructor(
    private readonly repository: PackageRepository,
    private readonly packageProductRepository: PackageProductRepository,
    private readonly productRepository: ProductRepository,
    private readonly userService: UserService,
  ) {}

  public async create(createPackageDto: CreatePackageDto): Promise<PackageDto> {
    const customer = await this.userService.findEntityByName(
      createPackageDto.customer,
    );

    const packageEntity = new Package(
      customer,
      createPackageDto.grossValue,
      true,
      createPackageDto.discount ? createPackageDto.discount : 0,
    );

    await this.setAvailableServicesByGrossValue(packageEntity);

    return new PackageDto(packageEntity);
  }

  public async findAll(): Promise<PackageDto[]> {
    const entities = await this.repository.findAll();

    return entities.map((entity) => new PackageDto(entity));
  }

  public async findById(id: string): Promise<PackageDto> {
    const entity = await this.repository.findById(id);
    if (!entity) {
      throw new Error(`Package with id ${id} not found`);
    }
    return new PackageDto(entity);
  }

  public async update(
    id: string,
    updatePackageDto: UpdatePackageDto,
  ): Promise<PackageDto> {
    const entity = await this.repository.findById(id);

    if (!entity) throw new NotFoundException(`Package with id ${id} not found`);

    const user = await this.userService.findEntityByName(
      updatePackageDto.customer,
    );

    if (!user) {
      throw new NotFoundException(
        `User with name ${updatePackageDto.customer} not found`,
      );
    }

    const newPartialPackage: Partial<Package> = {
      ...updatePackageDto,
      ...(updatePackageDto.customer && { customer: user }),
    };

    const updatedPackage = await this.repository.merge(
      entity,
      newPartialPackage,
    );

    const updatedEntity = await this.repository.save(updatedPackage);

    return new PackageDto(updatedEntity);
  }

  public async delete(id: string): Promise<void> {
    await this.repository.deleteById(id);
  }

  private async setAvailableServicesByGrossValue(
    packageEntity: Package,
  ): Promise<void> {
    const products = await this.productRepository.findAllByType(
      ProductsType.SERVICE,
    );

    if (products.length === 0) {
      throw new NotFoundException('No products found for type SERVICE');
    }

    const packageProductList: PackageProduct[] = [];

    for (const product of products) {
      const totalAvailableQuantity = Math.floor(
        packageEntity.grossValue / product.price,
      );

      const newPackageProduct = new PackageProduct(
        packageEntity,
        product,
        totalAvailableQuantity,
        0,
        totalAvailableQuantity,
      );

      await this.packageProductRepository.save(newPackageProduct);
      packageProductList.push(newPackageProduct);
    }

    packageEntity.setPackageProducts(packageProductList);
  }
}
