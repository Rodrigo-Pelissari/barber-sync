import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Comission } from './entities/comission.entity';

@Injectable()
export class ComissionRepository {
  constructor(
    @InjectRepository(Comission)
    private readonly repository: Repository<Comission>,
  ) {}

  public async save(comission: Comission): Promise<Comission> {
    return this.repository.save(comission);
  }

  public async findAll(): Promise<Comission[]> {
    return this.repository.find();
  }

  public async findById(id: string): Promise<Comission> {
    return this.repository.findOne({ where: { id } });
  }

  public async update(id: string, comission: Comission): Promise<Comission> {
    await this.repository.update(id, comission);
    return this.findById(id);
  }

  public async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  public async merge(
    target: Comission,
    source: Partial<Comission>,
  ): Promise<Comission> {
    return this.repository.merge(target, source);
  }

  public async findByBarberId(barberId: string): Promise<Comission[]> {
    return this.repository
      .createQueryBuilder('comission')
      .leftJoinAndSelect('comission.user', 'user')
      .where('user.id = :barberId', { barberId })
      .getMany();
  }

  public async findByBarberName(barberName: string): Promise<Comission[]> {
    return this.repository
      .createQueryBuilder('comission')
      .leftJoinAndSelect('comission.user', 'user')
      .where('user.name = :barberName', { barberName })
      .getMany();
  }

  public async findByPeriod(
    startDate: Date,
    endDate: Date,
  ): Promise<Comission[]> {
    return this.repository.find({
      where: {
        date: Between(startDate, endDate),
      },
    });
  }

  public async findByBarberAndPeriod(
    barberId: string,
    startDate: Date,
    endDate: Date,
  ): Promise<Comission[]> {
    return this.repository
      .createQueryBuilder('comission')
      .leftJoinAndSelect('comission.barber', 'user')
      .where('user.id = :barberId', { barberId })
      .andWhere('comission.date BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      })
      .getMany();
  }
}
