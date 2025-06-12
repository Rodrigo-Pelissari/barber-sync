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
    const users = await this.repository.findAll();
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
    const user = await this.repository.findById(id);
    if (!user) throw new NotFoundException(`User with id ${id} not found`);

    return new UserDto(
      user.id,
      user.name,
      user.cpf,
      user.email,
      user.phone,
      user.role,
    );
  }

  public async findByName(name: string): Promise<UserDto | null> {
    const user = await this.repository.findByName(name);
    if (!user) throw new NotFoundException(`User with name ${name} not found`);

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
    const user = await this.repository.findById(id);

    if (!user) throw new NotFoundException(`User with id ${id} not found`);

    updateUserDto.update(user);

    await this.repository.save(user);

    return user;
  }

  public async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  public async findEntityById(id: string): Promise<User | null> {
    const user = await this.repository.findById(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  public async findEntityByName(name: string): Promise<User | null> {
    const user = await this.repository.findByName(name);
    if (!user) {
      throw new NotFoundException(`User with name ${name} not found`);
    }
    return user;
  }
}
