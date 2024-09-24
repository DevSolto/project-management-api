import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';

@Injectable()
export class TaskService {

  constructor(
    @InjectRepository(Task)
    private readonly repositoryTask: Repository<Task>,
    @InjectRepository(User)
    private readonly repositoryUser: Repository<User>
  ) { }

  async create(createTaskDto: CreateTaskDto) {

    const creator = await this.repositoryUser.findOneBy({ id: createTaskDto.creatorId })
    if (!creator) {
      throw new NotFoundException("Creator not found")
    }

    const task = this.repositoryTask.create({
      ...createTaskDto,
      creator
    })



    return await this.repositoryTask.save(task)
  }

  async findAll() {
    return await this.repositoryTask.find()
  }

  async findOne(id: string) {
    const task = await this.repositoryTask.findOneBy({ id })
    if (!task) {
      throw new NotFoundException()
    }
    return task
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    const task = await this.repositoryTask.findOneBy({ id })
    if (!task) {
      throw new NotFoundException()
    }
    this.repositoryTask.merge(task, updateTaskDto)

    return await this.repositoryTask.save(task)
  }

  async remove(id: string) {
    const task = await this.repositoryTask.findOneBy({ id })
    if (!task) {
      throw new NotFoundException()
    }
    return await this.repositoryTask.remove(task);
  }
}
