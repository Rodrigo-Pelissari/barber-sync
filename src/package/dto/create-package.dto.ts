import { IsNumber, IsString } from 'class-validator';

export class CreatePackageDto {
  @IsString()
  customer: string;

  @IsNumber()
  grossValue: number;

  @IsNumber()
  discount?: number;
}
