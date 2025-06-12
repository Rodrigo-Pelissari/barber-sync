import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Schedule } from './entities/schedule.entity';
import { FindOptionsWhere, Repository } from 'typeorm';

@Injectable()
export class ScheduleRepository {
  constructor(
    @InjectRepository(Schedule)
    private readonly repository: Repository<Schedule>,
  ) {}

  public async save(entity: Schedule): Promise<Schedule> {
    return await this.repository.save(entity);
  }

  public async findAll(): Promise<Schedule[]> {
    return await this.repository.find();
  }

  public async findById(id: string): Promise<Schedule | null> {
    return await this.repository.findOneBy({ id });
  }

  public async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  public async merge(
    target: Schedule,
    source: Partial<Schedule>,
  ): Promise<Schedule> {
    return this.repository.merge(target, source);
  }

  public async findByUser(userId: string): Promise<Schedule[]> {
    return await this.repository.find({
      where: [
        { barber: { id: userId } } as FindOptionsWhere<Schedule>,
        { customer: { id: userId } } as FindOptionsWhere<Schedule>,
      ],
      relations: ['barber', 'customer', 'services'],
    });
  }

  public async findConcludedSchedulesByUser(
    userId: string,
  ): Promise<Schedule[]> {
    return await this.repository.find({
      where: [
        {
          barber: { id: userId },
          concluded: true,
        } as FindOptionsWhere<Schedule>,
        {
          customer: { id: userId },
          concluded: true,
        } as FindOptionsWhere<Schedule>,
      ],
      relations: ['barber', 'customer', 'services'],
    });
  }
}
