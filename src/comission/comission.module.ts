import { Module } from '@nestjs/common';
import { ComissionService } from './comission.service';
import { ComissionController } from './comission.controller';

@Module({
  controllers: [ComissionController],
  providers: [ComissionService],
})
export class ComissionModule {}
