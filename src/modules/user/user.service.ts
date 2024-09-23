import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>
  ) { }

  async create(createUserDto: CreateUserDto) {
    const user = this.repository.create(createUserDto)

    return await this.repository.save(user)
  }

  async findAll() {
    return await this.repository.find()
  }

  async findOne(id: string) {
    const user = await this.repository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException()
    }
    return user
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.repository.findOneBy({ id })
    if (!user) {
      throw new NotFoundException()
    }
    this.repository.merge(user, updateUserDto)

    return await this.repository.save(user)
  }

  async remove(id: string) {
    const user = await this.repository.findOneBy({ id })
    if (!user) {
      throw new NotFoundException()
    }
    return await this.repository.remove(user);
  }

  
}
