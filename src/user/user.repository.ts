import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class ScheduleRepository {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  public async save(entity: User): Promise<User> {
    return await this.repository.save(entity);
  }

  public async findAll(): Promise<User[]> {
    return await this.repository.find();
  }

  public async findById(id: string): Promise<User | null> {
    return await this.repository.findOneBy({ id });
  }

  public async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
