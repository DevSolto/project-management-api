import { Controller, Param, Patch, Body, Delete, Get } from '@nestjs/common';
import { UserTaskService } from './userTask.service';

@Controller('users/:userId/tasks')
export class UserTaskController {
  constructor(private readonly userTaskService: UserTaskService) { }

  @Patch()
  async assignTasks(
    @Param('userId') userId: string,
    @Body('taskIds') taskIds: string[],
  ) {
    return this.userTaskService.assignTasksToUser(userId, taskIds);
  }

  @Get()
  async getTasks(@Param('userId') userId: string) {
    return this.userTaskService.getTasksForUser(userId);
  }

  @Delete(':taskId')
  async removeTask(
    @Param('userId') userId: string,
    @Param('taskId') taskId: string,
  ) {
    return this.userTaskService.removeTaskFromUser(userId, taskId);
  }
}
