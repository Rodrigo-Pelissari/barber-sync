import { Module } from '@nestjs/common';
import { PackageService } from './package.service';
import { PackageController } from './package.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Package } from './entities/package.entity';
import { PackageRepository } from './package.repository';
import { ProductModule } from 'src/product/product.module';
import { UserModule } from 'src/user/user.module';
import { PackageProductRepository } from './package-product.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Package]), ProductModule, UserModule],
  controllers: [PackageController],
  providers: [PackageService, PackageRepository, PackageProductRepository],
  exports: [PackageService, PackageRepository, PackageProductRepository],
})
export class PackageModule {}
