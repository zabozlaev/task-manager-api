import { Injectable, HttpService, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectEntity } from './project.entity';
import { Repository } from 'typeorm';
import { CreateProjectDto } from './dtos/createProject';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(ProjectEntity)
    private readonly projectRepository: Repository<ProjectEntity>,
  ) {}

  async create(userId: string, data: CreateProjectDto) {
    const project = await this.projectRepository.create({
      ...data,
      userId,
    });

    return await this.projectRepository.save(project);
  }
  async list(userId: string) {
    return await this.projectRepository.find({
      where: {
        userId,
      },
      select: ['id', 'name', 'description'],
    });
  }

  async hasAccess(givenUserId: string, projectId: string) {
    const project = await this.projectRepository.findOne({
      where: {
        id: projectId,
      },
    });

    if (project) {
      return project.userId === givenUserId;
    }
    return false;
  }

  async delete(userId: string, projectId: string) {
    if (!(await this.hasAccess(userId, projectId))) {
      throw new HttpException('Forbidden.', 403);
    }
    return await this.projectRepository.delete({
      id: projectId,
    });
  }
}
