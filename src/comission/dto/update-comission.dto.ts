import { PartialType } from '@nestjs/mapped-types';
import { CreateComissionDto } from './create-comission.dto';

export class UpdateComissionDto extends PartialType(CreateComissionDto) {}
