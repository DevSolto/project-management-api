import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly repositoryProject: Repository<Project>,
    @InjectRepository(User)
    private readonly repositoryUser: Repository<User>,
  ) {

  }
  async create(creatorId: string, createProjectDto: CreateProjectDto) {
    const creator = await this.repositoryUser.findOneBy({ id: creatorId })
    if (!creator) {
      throw new NotFoundException()
    }
    const project = this.repositoryProject.create({
      ...createProjectDto,
      creator
    })

    return this.repositoryProject.save(project)
  }

  async findAll() {
    return await this.repositoryProject.find()
  }

  async findOne(id: string) {
    const project = await this.repositoryProject.findOneBy({ id })

    if (!project) {
      throw new NotFoundException()
    }
    return project
  }

  async update(id: string, updateProjectDto: UpdateProjectDto) {
    const project = await this.repositoryProject.findOneBy({ id })

    if (!project) {
      throw new NotFoundException()
    }

    this.repositoryProject.merge(project, updateProjectDto)

    return this.repositoryProject.save(project)
  }

  async remove(id: string) {
    const project = await this.repositoryProject.findOneBy({ id })

    if (!project) {
      throw new NotFoundException()
    }

    return this.repositoryProject.remove(project)
  }
}
