import { Module } from '@nestjs/common';
import { ComissionService } from './comission.service';
import { ComissionController } from './comission.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comission } from './entities/comission.entity';
import { ComissionRepository } from './comission.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Comission])],
  controllers: [ComissionController],
  providers: [ComissionService, ComissionRepository],
  exports: [ComissionService, ComissionRepository],
})
export class ComissionModule {}
