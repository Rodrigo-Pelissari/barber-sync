import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePackageDto } from './dto/create-package.dto';
import { UpdatePackageDto } from './dto/update-package.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Package } from './entities/package.entity';
import { PackageDto } from './dto/package.dto';
import { PackageRepository } from './package.repository';

@Injectable()
export class PackageService {
  constructor(
    @InjectRepository(Package)
    private readonly repository: PackageRepository,
  ) {}

  public async create(createPackageDto: CreatePackageDto): Promise<PackageDto> {
    const entity = createPackageDto.toEntity();
    const savedEntity = await this.repository.save(entity);

    return new PackageDto(
      savedEntity.id,
      savedEntity.customer,
      savedEntity.value,
      savedEntity.servicesQuantity,
      savedEntity.usedServices,
    );
  }

  public async findAll(): Promise<PackageDto[]> {
    const entities = await this.repository.findAll();

    return entities.map(
      (entity) =>
        new PackageDto(
          entity.id,
          entity.customer,
          entity.value,
          entity.servicesQuantity,
          entity.usedServices,
        ),
    );
  }

  public async findById(id: string): Promise<PackageDto> {
    const entity = await this.repository.findById(id);
    if (!entity) {
      throw new Error(`Package with id ${id} not found`);
    }
    return new PackageDto(
      entity.id,
      entity.customer,
      entity.value,
      entity.servicesQuantity,
      entity.usedServices,
    );
  }

  public async update(
    id: string,
    updatePackageDto: UpdatePackageDto,
  ): Promise<PackageDto> {
    const entity = await this.repository.findById(id);

    if (!entity) throw new NotFoundException(`Package with id ${id} not found`);

    updatePackageDto.update(entity);

    const updatedEntity = await this.repository.save(entity);

    return new PackageDto(
      updatedEntity.id,
      updatedEntity.customer,
      updatedEntity.value,
      updatedEntity.servicesQuantity,
      updatedEntity.usedServices,
    );
  }

  public async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
