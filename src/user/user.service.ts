import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  public async create(createUserDto: CreateUserDto): Promise<UserDto> {
    const entity = createUserDto.toEntity();
    await this.repository.save(entity);

    return new UserDto(
      entity.id,
      entity.name,
      entity.cpf,
      entity.email,
      entity.phone,
      entity.role,
    );
  }

  public async findAll(): Promise<UserDto[]> {
    const users = await this.repository.find();
    return users.map(
      (user) =>
        new UserDto(
          user.id,
          user.name,
          user.cpf,
          user.email,
          user.phone,
          user.role,
        ),
    );
  }

  public async findById(id: string): Promise<UserDto | null> {
    const user = await this.repository.findOneBy({ id });
    if (!user) return null;
    return new UserDto(
      user.id,
      user.name,
      user.cpf,
      user.email,
      user.phone,
      user.role,
    );
  }

  public async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User | null> {
    const user = await this.repository.findOneBy({ id });

    if (!user) throw new NotFoundException(`User with id ${id} not found`);

    updateUserDto.update(user);

    await this.repository.save(user);

    return user;
  }

  public async remove(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
