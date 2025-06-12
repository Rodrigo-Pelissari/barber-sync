import { Test, TestingModule } from '@nestjs/testing';
import { ComissionService } from './comission.service';

describe('ComissionService', () => {
  let service: ComissionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ComissionService],
    }).compile();

    service = module.get<ComissionService>(ComissionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
