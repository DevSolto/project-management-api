import { Controller, Param, Patch, Body, Delete, Get } from '@nestjs/common';
import { UserTaskService } from './userTask.service';
import { ApiOperation, ApiTags, ApiParam, ApiBody, ApiResponse } from '@nestjs/swagger';

@ApiTags('User-Tasks')
@Controller('users/:userId/tasks')
export class UserTaskController {
  constructor(private readonly userTaskService: UserTaskService) { }

  @ApiOperation({ summary: 'Atribuir tarefas a um usuário' })
  @ApiParam({ name: 'userId', description: 'ID do usuário' })
  @ApiBody({ description: 'IDs das tarefas a serem atribuídas ao usuário', schema: { example: { taskIds: ['taskId1', 'taskId2'] } } })
  @ApiResponse({ status: 200, description: 'Tarefas atribuídas com sucesso ao usuário' })
  @ApiResponse({ status: 404, description: 'Usuário ou uma das tarefas não encontrada(s)' })
  @Patch()
  async assignTasks(
    @Param('userId') userId: string,
    @Body('taskIds') taskIds: string[],
  ) {
    return this.userTaskService.assignTasksToUser(userId, taskIds);
  }

  @ApiOperation({ summary: 'Obter todas as tarefas atribuídas a um usuário' })
  @ApiParam({ name: 'userId', description: 'ID do usuário' })
  @ApiResponse({ status: 200, description: 'Lista de tarefas retornada com sucesso' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  @Get()
  async getTasks(@Param('userId') userId: string) {
    return this.userTaskService.getTasksForUser(userId);
  }

  @ApiOperation({ summary: 'Remover uma tarefa atribuída de um usuário' })
  @ApiParam({ name: 'userId', description: 'ID do usuário' })
  @ApiParam({ name: 'taskId', description: 'ID da tarefa a ser removida' })
  @ApiResponse({ status: 200, description: 'Tarefa removida com sucesso' })
  @ApiResponse({ status: 404, description: 'Usuário ou tarefa não encontrado' })
  @Delete(':taskId')
  async removeTask(
    @Param('userId') userId: string,
    @Param('taskId') taskId: string,
  ) {
    return this.userTaskService.removeTaskFromUser(userId, taskId);
  }
}
