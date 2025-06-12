import { Test, TestingModule } from '@nestjs/testing';
import { ComissionController } from './comission.controller';
import { ComissionService } from './comission.service';

describe('ComissionController', () => {
  let controller: ComissionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ComissionController],
      providers: [ComissionService],
    }).compile();

    controller = module.get<ComissionController>(ComissionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
