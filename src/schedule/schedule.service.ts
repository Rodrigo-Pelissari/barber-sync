import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { Schedule } from './entities/schedule.entity';
import { ScheduleRepository } from './schedule.repository';
import { ScheduleDto } from './dto/schedule.dto';
import { User } from 'src/user/entities/user.entity';
import { ProductRepository } from 'src/product/product.repository';
import { UserRepository } from 'src/user/user.repository';
import { ComissionService } from 'src/comission/comission.service';
import { CreateComissionDto } from 'src/comission/dto/create-comission.dto';
import { Product } from 'src/product/entities/product.entity';

@Injectable()
export class ScheduleService {
  constructor(
    private readonly scheduleRepository: ScheduleRepository,
    private readonly productRepository: ProductRepository,
    private readonly userRepository: UserRepository,
    private readonly comissionService: ComissionService,
  ) {}

  public async create(
    createScheduleDto: CreateScheduleDto,
    user: User,
    otherUserName: string,
  ): Promise<ScheduleDto> {
    const otherUser = await this.userRepository.findByName(otherUserName);
    if (!otherUser) {
      throw new NotFoundException(`User with name ${otherUserName} not found`);
    }

    const products: Product[] = [];

    for (const productName of createScheduleDto.productsNames) {
      const product = await this.productRepository.findByName(productName);
      if (!product) {
        throw new NotFoundException(
          `Product with name ${productName} not found`,
        );
      }
      products.push(product);
    }

    const dateObj = new Date(createScheduleDto.date);

    const entity = new Schedule(
      user.role === 'customer' ? otherUser : user,
      user.role !== 'customer' ? user : otherUser,
      dateObj,
      createScheduleDto.type,
      products,
      0,
      false,
    );

    await this.setScheduleProductsAndValue(entity);

    const savedEntity = await this.scheduleRepository.save(entity);

    return new ScheduleDto(savedEntity);
  }

  public async findAll(): Promise<ScheduleDto[]> {
    const schedules = await this.scheduleRepository.findAll();

    return schedules.map((schedule) => new ScheduleDto(schedule));
  }

  public async findById(id: string): Promise<ScheduleDto | null> {
    const schedule = await this.scheduleRepository.findById(id);

    if (!schedule)
      throw new NotFoundException(`Schedule with id ${id} not found`);

    return new ScheduleDto(schedule);
  }

  public async update(
    id: string,
    updateScheduleDto: UpdateScheduleDto,
  ): Promise<ScheduleDto | null> {
    const schedule = await this.scheduleRepository.findById(id);

    if (!schedule)
      throw new NotFoundException(`Schedule with id ${id} not found`);

    const newPartialSchedule: Partial<Schedule> = {
      ...updateScheduleDto,
      ...(updateScheduleDto.date && { date: new Date(updateScheduleDto.date) }),
    };

    const updatedSchedule = await this.scheduleRepository.merge(
      schedule,
      newPartialSchedule,
    );

    await this.setScheduleProductsAndValue(updatedSchedule);
    await this.scheduleRepository.save(updatedSchedule);

    return new ScheduleDto(updatedSchedule);
  }

  public async delete(id: string): Promise<void> {
    await this.scheduleRepository.delete(id);
  }

  public async concludeSchedule(scheduleId: string): Promise<void> {
    const schedule = await this.scheduleRepository.findById(scheduleId);

    if (!schedule) {
      throw new NotFoundException(`Schedule with id ${scheduleId} not found`);
    }

    const comission = new CreateComissionDto(
      schedule.getBarber(),
      schedule.getValue(),
      schedule.getDate(),
    );

    await this.comissionService.create(comission);

    schedule.setConcluded(true);
    await this.scheduleRepository.save(schedule);
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
