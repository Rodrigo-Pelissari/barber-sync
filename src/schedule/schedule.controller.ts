import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { plainToInstance } from 'class-transformer';
import { UserService } from 'src/user/user.service';

@Controller('schedules')
export class ScheduleController {
  constructor(
    private readonly service: ScheduleService,
    private readonly userService: UserService,
  ) {}

  @Post()
  public async create(@Body() createScheduleDto: CreateScheduleDto) {
    const creater = await this.userService.findEntityByName(
      createScheduleDto.userName,
    );

    const dto = plainToInstance(CreateScheduleDto, createScheduleDto);

    return await this.service.create(
      dto,
      creater,
      createScheduleDto.otherUserName,
    );
  }

  @Get()
  public async findAll() {
    return await this.service.findAll();
  }

  @Get(':id')
  public async findOne(@Param('id') id: string) {
    return await this.service.findById(id);
  }

  @Patch(':id')
  public async update(
    @Param('id') id: string,
    @Body() updateScheduleDto: UpdateScheduleDto,
  ) {
    return await this.service.update(id, updateScheduleDto);
  }

  @Delete(':id')
  public async remove(@Param('id') id: string) {
    return await this.service.delete(id);
  }
}
