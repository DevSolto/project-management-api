import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt'; // Corrigida a importação de bcrypt

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) { }

  async create(createUserDto: CreateUserDto) {
    await this.isUserExists(createUserDto);

    const passwordHash = await bcrypt.hash(createUserDto.password, 10);

    const user = this.repository.create({
      ...createUserDto,
      password: passwordHash
    });

    return await this.repository.save(user);
  }

  async findAll() {
    return await this.repository.find();
  }

  async findOne(id: string) {
    const user = await this.repository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  async findOneByUserName(userName: string) {
    const user = await this.repository.findOneBy({ userName });
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.repository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException();
    }

    await this.isUserExists(updateUserDto)

    this.repository.merge(user, updateUserDto);
    return await this.repository.save(user);
  }

  async remove(id: string) {
    const user = await this.repository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException();
    }
    return await this.repository.remove(user);
  }

  private async isUserExists(data: CreateUserDto | UpdateUserDto) {
    if (data.email) {
      const userWithThisEmail = await this.repository.findOneBy({ email: data.email });
      if (userWithThisEmail) {
        throw new ConflictException('There is already a user with this email');
      }
    }

    if (data.userName) {
      const userWithThisUserName = await this.repository.findOneBy({ userName: data.userName });
      if (userWithThisUserName) {
        throw new ConflictException('There is already a user with this user name');
      }
    }
  }
}
