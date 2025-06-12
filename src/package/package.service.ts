import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePackageDto } from './dto/create-package.dto';
import { UpdatePackageDto } from './dto/update-package.dto';
import { PackageDto } from './dto/package.dto';
import { PackageRepository } from './package.repository';

@Injectable()
export class PackageService {
  constructor(private readonly repository: PackageRepository) {}

  public async create(createPackageDto: CreatePackageDto): Promise<PackageDto> {
    const entity = createPackageDto.toEntity();
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

    const updatedPackage = await this.repository.merge(
      entity,
      updatePackageDto,
    );

    const updatedEntity = await this.repository.save(updatedPackage);

    return new PackageDto(updatedEntity);
  }

  public async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
