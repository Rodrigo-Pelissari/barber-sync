import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { Schedule } from './entities/schedule.entity';
import { ScheduleRepository } from './schedule.repository';
import { ScheduleDto } from './dto/schedule.dto';
import { User } from 'src/user/entities/user.entity';
import { ProductRepository } from 'src/product/product.repository';
import { UserRepository } from 'src/user/user.repository';

@Injectable()
export class ScheduleService {
  constructor(
    private readonly scheduleRepository: ScheduleRepository,
    private readonly productRepository: ProductRepository,
    private readonly userRepository: UserRepository,
  ) {}

  public async createScheduleAsCustomer(
    createScheduleDto: CreateScheduleDto,
    customer: User,
    barberName: string,
  ): Promise<ScheduleDto> {
    const entity = createScheduleDto.toEntity();

    const barber = await this.userRepository.findByName(barberName);
    if (!barber) {
      throw new NotFoundException(`Barber with name ${barberName} not found`);
    }
    entity.setBarber(barber);

    for (const productName of createScheduleDto.productsNames) {
      const product = await this.productRepository.findByName(productName);
      if (!product) {
        throw new NotFoundException(
          `Product with name ${productName} not found`,
        );
      }
      entity.addProduct(product);
    }

    entity.setCustomer(customer);

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

  public async createScheduleAsBarber(
    createScheduleDto: CreateScheduleDto,
    barber: User,
    customerName: string,
  ): Promise<ScheduleDto> {
    const entity = createScheduleDto.toEntity();

    const customer = await this.userRepository.findByName(customerName);
    if (!customer) {
      throw new NotFoundException(
        `Customer with name ${customerName} not found`,
      );
    }
    entity.setCustomer(customer);

    for (const productName of createScheduleDto.productsNames) {
      const product = await this.productRepository.findByName(productName);
      if (!product) {
        throw new NotFoundException(
          `Product with name ${productName} not found`,
        );
      }
      entity.addProduct(product);
    }

    entity.setBarber(barber);

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
      schedule.addProduct(product);
      totalServiceValue += product.getPrice();
    }

    schedule.setValue(totalServiceValue);
  }
}
