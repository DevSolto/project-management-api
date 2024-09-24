import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserTaskService } from './userTask.service';
import { UserTaskController } from './userTask.controller';
import { Task } from '../task/entities/task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Task])],
  controllers: [UserController, UserTaskController],
  providers: [UserService, UserTaskService],
  exports: [UserService]
})
export class UserModule { }
