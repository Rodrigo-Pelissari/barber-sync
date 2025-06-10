import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { Schedule } from './entities/schedule.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ScheduleRepository } from './schedule.repository';
import { ScheduleDto } from './dto/schedule.dto';
import { ProductRepository } from 'src/product/product.repository';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(Schedule)
    private readonly scheduleRepository: ScheduleRepository,
    private readonly productRepository: ProductRepository,
  ) {}

  public async create(
    createScheduleDto: CreateScheduleDto,
  ): Promise<ScheduleDto> {
    const entity = createScheduleDto.toEntity();

    await this.setScheduleProductsAndValue(entity);

    const savedEntity = await this.scheduleRepository.save(entity);

    return new ScheduleDto(
      savedEntity.id,
      savedEntity.barber,
      savedEntity.customer,
      savedEntity.date,
      savedEntity.type,
      savedEntity.service,
      savedEntity.value,
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

  public async setScheduleProductsAndValue(schedule: Schedule): Promise<void> {
    let totalServiceValue = 0;

    for (const product of schedule.getService()) {
      const productEntity = await this.productRepository.findById(product.id);
      if (productEntity) {
        schedule.addProduct(productEntity);
        totalServiceValue += productEntity.getPrice();
      } else {
        throw new NotFoundException(`
          [ADD PRODUCT]: Product with id ${product.id} not found`);
      }
    }

    schedule.setValue(totalServiceValue);
  }
}
