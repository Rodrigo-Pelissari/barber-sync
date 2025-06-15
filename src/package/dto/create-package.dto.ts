import { IsNumber, IsObject, IsString } from 'class-validator';

export class CreatePackageDto {
  @IsString()
  customer: string;

  @IsNumber()
  grossValue: number;

  @IsNumber()
  discount?: number;

  @IsObject()
  servicesQuantityMap: Record<string, number>;
}
