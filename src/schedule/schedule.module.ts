import { Module } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { ScheduleController } from './schedule.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Schedule } from './entities/schedule.entity';
import { ScheduleRepository } from './schedule.repository';
import { ProductModule } from 'src/product/product.module';
import { UserModule } from 'src/user/user.module';
import { ComissionModule } from 'src/comission/comission.module';
import { PackageModule } from 'src/package/package.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Schedule]),
    ProductModule,
    UserModule,
    ComissionModule,
    PackageModule,
  ],
  controllers: [ScheduleController],
  providers: [ScheduleService, ScheduleRepository],
  exports: [ScheduleService, ScheduleRepository],
})
export class ScheduleModule {}
