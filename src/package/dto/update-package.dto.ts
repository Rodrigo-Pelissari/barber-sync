import { PartialType } from '@nestjs/mapped-types';
import { CreatePackageDto } from './create-package.dto';
import { Package } from '../entities/package.entity';

export class UpdatePackageDto extends PartialType(CreatePackageDto) {
  public update(entity: Package): void {
    if (this.customer !== undefined) entity.customer = this.customer;
    if (this.value !== undefined) entity.value = this.value;
    if (this.servicesQuantity !== undefined)
      entity.servicesQuantity = this.servicesQuantity;
    if (this.usedServices !== undefined)
      entity.usedServices = this.usedServices;
  }
}
