import { Module } from '@nestjs/common';
import { PackageService } from './package.service';
import { PackageController } from './package.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Package } from './entities/package.entity';
import { PackageRepository } from './package.repository';
import { ProductModule } from 'src/product/product.module';

@Module({
  imports: [TypeOrmModule.forFeature([Package]), ProductModule],
  controllers: [PackageController],
  providers: [PackageService, PackageRepository],
  exports: [PackageService, PackageRepository],
})
export class PackageModule {}
