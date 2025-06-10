import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { Schedule } from './entities/schedule.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ScheduleRepository } from './schedule.repository';
import { ScheduleDto } from './dto/schedule.dto';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(Schedule)
    private readonly scheduleRepository: ScheduleRepository,
  ) {}

  public async create(
    createScheduleDto: CreateScheduleDto,
  ): Promise<ScheduleDto> {
    const entity = createScheduleDto.toEntity();

    this.setScheduleValue(entity);

    await this.scheduleRepository.save(entity);

    return new ScheduleDto(
      entity.id,
      entity.barber,
      entity.customer,
      entity.date,
      entity.type,
      entity.service,
      entity.value,
    );
  }

  public async findAll(): Promise<ScheduleDto[]> {
    const schedules = await this.scheduleRepository.findAll();

    return schedules.map(
      (schedule) =>
        new ScheduleDto(
          schedule.id,
          schedule.barber,
          schedule.customer,
          schedule.date,
          schedule.type,
          schedule.service,
          schedule.value,
        ),
    );
  }

  public async findById(id: string): Promise<ScheduleDto | null> {
    const schedule = await this.scheduleRepository.findById(id);

    if (!schedule)
      throw new NotFoundException(`Schedule with id ${id} not found`);

    return new ScheduleDto(
      schedule.id,
      schedule.barber,
      schedule.customer,
      schedule.date,
      schedule.type,
      schedule.service,
      schedule.value,
    );
  }

  public async update(
    id: string,
    updateScheduleDto: UpdateScheduleDto,
  ): Promise<ScheduleDto | null> {
    const schedule = await this.scheduleRepository.findById(id);

    if (!schedule)
      throw new NotFoundException(`Schedule with id ${id} not found`);

    updateScheduleDto.update(schedule);

    const updatedSchedule = await this.scheduleRepository.save(schedule);

    return new ScheduleDto(
      updatedSchedule.id,
      updatedSchedule.barber,
      updatedSchedule.customer,
      updatedSchedule.date,
      updatedSchedule.type,
      updatedSchedule.service,
      updatedSchedule.value,
    );
  }

  public async delete(id: string): Promise<void> {
    await this.scheduleRepository.delete(id);
  }

  public setScheduleValue(schedule: Schedule): void {
    let totalServiceValue = 0;

    for (const service of schedule.getService()) {
      if (service.getPrice() !== undefined) {
        totalServiceValue += service.getPrice();
      }
    }

    schedule.setValue(totalServiceValue);
  }
}
