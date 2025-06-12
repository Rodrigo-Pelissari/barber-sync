import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateComissionDto } from './dto/create-comission.dto';
import { UpdateComissionDto } from './dto/update-comission.dto';
import { ComissionRepository } from './comission.repository';
import { ComissionDto } from './dto/comission.dto';

@Injectable()
export class ComissionService {
  constructor(private readonly comissionRepository: ComissionRepository) {}

  public async create(
    createComissionDto: CreateComissionDto,
  ): Promise<ComissionDto> {
    const entity = createComissionDto.toEntity();
    const savedEntity = await this.comissionRepository.save(entity);

    return new ComissionDto(
      savedEntity.barber,
      savedEntity.value,
      savedEntity.date,
    );
  }

  public async findAll(): Promise<ComissionDto[]> {
    return (await this.comissionRepository.findAll()).map(
      (comission) =>
        new ComissionDto(comission.barber, comission.value, comission.date),
    );
  }

  public async findById(id: string): Promise<ComissionDto> {
    const comission = await this.comissionRepository.findById(id);
    if (!comission)
      throw new NotFoundException(`Comission with id ${id} not found`);

    return new ComissionDto(comission.barber, comission.value, comission.date);
  }

  public async findByBarberId(barberId: string): Promise<ComissionDto[]> {
    const comissions = await this.comissionRepository.findByBarberId(barberId);
    return comissions.map(
      (comission) =>
        new ComissionDto(comission.barber, comission.value, comission.date),
    );
  }

  public async findByBarberName(barberName: string): Promise<ComissionDto[]> {
    const comissions =
      await this.comissionRepository.findByBarberName(barberName);
    return comissions.map(
      (comission) =>
        new ComissionDto(comission.barber, comission.value, comission.date),
    );
  }

  public async update(
    id: string,
    updateComissionDto: UpdateComissionDto,
  ): Promise<ComissionDto> {
    const comission = await this.comissionRepository.findById(id);
    if (!comission)
      throw new NotFoundException(`Comission with id ${id} not found`);

    updateComissionDto.update(comission);
    await this.comissionRepository.save(comission);

    return new ComissionDto(comission.barber, comission.value, comission.date);
  }

  public async delete(id: string): Promise<void> {
    const comission = await this.comissionRepository.findById(id);
    if (!comission)
      throw new NotFoundException(`Comission with id ${id} not found`);

    await this.comissionRepository.delete(id);
  }
}
