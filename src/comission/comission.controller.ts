import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ComissionService } from './comission.service';
import { CreateComissionDto } from './dto/create-comission.dto';
import { UpdateComissionDto } from './dto/update-comission.dto';

@Controller('comission')
export class ComissionController {
  constructor(private readonly comissionService: ComissionService) {}

  @Post()
  create(@Body() createComissionDto: CreateComissionDto) {
    return this.comissionService.create(createComissionDto);
  }

  @Get()
  findAll() {
    return this.comissionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.comissionService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateComissionDto: UpdateComissionDto,
  ) {
    return this.comissionService.update(+id, updateComissionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.comissionService.remove(+id);
  }
}
