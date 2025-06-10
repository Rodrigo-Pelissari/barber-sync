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

@Controller('schedules')
export class ScheduleController {
  constructor(private readonly service: ScheduleService) {}

  @Post()
  create(@Body() createScheduleDto: CreateScheduleDto) {
    return this.service.create(createScheduleDto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findById(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateScheduleDto: UpdateScheduleDto,
  ) {
    return this.service.update(id, updateScheduleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.delete(id);
  }
}
