import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {

  constructor(
    @InjectRepository(Task)
    private readonly repository: Repository<Task>
  ) {

  }

  async create(createTaskDto: CreateTaskDto) {
    const task = this.repository.create(createTaskDto)

    return await this.repository.save(task)
  }

  async findAll() {
    return await this.repository.find()
  }

  async findOne(id: string) {
    const task = await this.repository.findOneBy({ id })
    if (!task) {
      throw new NotFoundException()
    }
    return task
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    const task = await this.repository.findOneBy({ id })
    if (!task) {
      throw new NotFoundException()
    }
    this.repository.merge(task, updateTaskDto)

    return await this.repository.save(task)
  }

  async remove(id: string) {
    const task = await this.repository.findOneBy({ id })
    if (!task) {
      throw new NotFoundException()
    }
    return await this.repository.remove(task);
  }
}
