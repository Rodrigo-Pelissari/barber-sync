import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Schedule } from './entities/schedule.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ScheduleRepository {
  constructor(
    @InjectRepository(Schedule)
    private readonly repository: Repository<Schedule>,
  ) {}

  async save(entity: Schedule): Promise<Schedule> {
    return await this.repository.save(entity);
  }

  async findAll(): Promise<Schedule[]> {
    return await this.repository.find();
  }

  async findById(id: string): Promise<Schedule | null> {
    return await this.repository.findOneBy({ id });
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
