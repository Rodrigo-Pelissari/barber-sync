import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserDto } from './dto/user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly repository: UserRepository) {}

  public async create(createUserDto: CreateUserDto): Promise<UserDto> {
    const entity = createUserDto.toEntity();
    const savedEntity = await this.repository.save(entity);

    return new UserDto(savedEntity);
  }

  public async findAll(): Promise<UserDto[]> {
    const users = await this.repository.findAll();
    return users.map((user) => new UserDto(user));
  }

  public async findById(id: string): Promise<UserDto | null> {
    const user = await this.repository.findById(id);
    if (!user) throw new NotFoundException(`User with id ${id} not found`);

    return new UserDto(user);
  }

  public async findByName(name: string): Promise<UserDto | null> {
    const user = await this.repository.findByName(name);
    if (!user) throw new NotFoundException(`User with name ${name} not found`);

    return new UserDto(user);
  }

  public async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserDto | null> {
    const user = await this.repository.findById(id);

    if (!user) throw new NotFoundException(`User with id ${id} not found`);

    const updatedUser = await this.repository.merge(user, updateUserDto);

    await this.repository.save(updatedUser);

    return new UserDto(updatedUser);
  }

  public async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  public async findEntityById(id: string): Promise<User> {
    const user = await this.repository.findById(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  public async findEntityByName(name: string): Promise<User> {
    const user = await this.repository.findByName(name);
    if (!user) {
      throw new NotFoundException(`User with name ${name} not found`);
    }
    return user;
  }
}
