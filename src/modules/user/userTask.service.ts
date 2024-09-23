import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Task } from '../tasks/entities/task.entity';

@Injectable()
export class UserTaskService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) { }

  async assignTasksToUser(userId: string, taskIds: string[]) {
    const user = await this.userRepository.findOne({ where: { id: userId }, relations: ['tasks'] });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const tasks = await this.taskRepository.findBy({
      id: In(taskIds)
    });
    if (tasks.length !== taskIds.length) {
      throw new NotFoundException('One or more tasks not found');
    }

    user.tasks = [...user.tasks, ...tasks];
    return this.userRepository.save(user);
  }

  // Remove a specific task from a user
  async removeTaskFromUser(userId: string, taskId: string) {
    const user = await this.userRepository.findOne({ where: { id: userId }, relations: ['tasks'] });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    user.tasks = user.tasks.filter(task => task.id !== taskId); // Remove the task
    return this.userRepository.save(user); // Save the updated user
  }

  // Get tasks assigned to a user
  async getTasksForUser(userId: string): Promise<Task[]> {
    const user = await this.userRepository.findOne({ where: { id: userId }, relations: ['tasks'] });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    return user.tasks; // Return the tasks assigned to the user
  }
}
