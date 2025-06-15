import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePackageDto } from './dto/create-package.dto';
import { UpdatePackageDto } from './dto/update-package.dto';
import { PackageDto } from './dto/package.dto';
import { PackageRepository } from './package.repository';
import { Package } from './entities/package.entity';
import { ProductRepository } from 'src/product/product.repository';
import { UserService } from 'src/user/user.service';

@Injectable()
export class PackageService {
  constructor(
    private readonly repository: PackageRepository,
    private readonly productRepository: ProductRepository,
    private readonly userService: UserService,
  ) {}

  public async create(createPackageDto: CreatePackageDto): Promise<PackageDto> {
    const customer = await this.userService.findEntityByName(
      createPackageDto.customer,
    );

    const customerActivePackage =
      await this.repository.findActivePackageByCustomer(customer.id);

    let packageNetValue = 0;

    if (customerActivePackage) {
      packageNetValue =
        customerActivePackage.getGrossValue() -
        customerActivePackage.getUsedValue();

      customerActivePackage.isActive = false;

      await this.repository.save(customerActivePackage);
    }

    const entity = new Package(
      customer,
      createPackageDto.grossValue + packageNetValue,
      0,
      createPackageDto.servicesQuantityMap,
      [],
      true,
      createPackageDto.discount ? createPackageDto.discount : 0,
    );

    await this.calculateAvailableServicesPerProduct(entity);

    const savedEntity = await this.repository.save(entity);

    return new PackageDto(savedEntity);
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
    await this.repository.delete(id);
  }

  private async calculateAvailableServicesPerProduct(
    entity: Package,
  ): Promise<void> {
    const products = await this.productRepository.findAll();

    if (!products || products.length === 0) {
      throw new NotFoundException(
        'No products found to calculate services quantity',
      );
    }

    const availableValue = entity.grossValue - entity.usedValue;

    entity.servicesQuantityMap = {};

    for (const product of products) {
      const serviceQuantity = Math.floor(availableValue / product.price);
      entity.servicesQuantityMap[product.name] = serviceQuantity;
    }
  }
}
