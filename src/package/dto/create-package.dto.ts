import { Type } from 'class-transformer';
import { IsNumber, IsObject, ValidateNested } from 'class-validator';
import { User } from 'src/user/entities/user.entity';
import { Package } from '../entities/package.entity';

export class CreatePackageDto {
  @IsObject()
  @ValidateNested()
  @Type(() => User)
  customer: User;

  @IsNumber()
  grossValue: number;

  @IsNumber()
  discount?: number;

  @IsObject()
  servicesQuantityMap: Record<string, number>;

  public toEntity(): Package {
    return new Package(
      this.customer,
      this.grossValue,
      0,
      this.servicesQuantityMap,
      [],
      this.discount,
    );
  }
}
