import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from './task.entity';
import { Repository } from 'typeorm';
import { ProjectService } from 'src/project/project.service';
import { CreateTaskDto } from './dtos/createTask';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>,
    private readonly projectService: ProjectService,
  ) {}

  async hasAccess(givenUserId: string, taskId: string) {
    const task = await this.taskRepository
      .createQueryBuilder('task')
      .select('task.id')
      .where('task.id = :taskId', { taskId })
      .leftJoinAndSelect('task.project', 'projects')
      .getOne();

    if (task) {
      const { project } = task;
      return givenUserId === project.userId;
    }
    return false;
  }

  listAll() {
    return this.taskRepository.find();
  }

  async create(userId: string, data: CreateTaskDto) {
    if (!(await this.projectService.hasAccess(userId, data.projectId))) {
      throw new HttpException('Forbidden.', 403);
    }
    const task = await this.taskRepository.create({
      ...data,
    });
    return await this.taskRepository.save(task);
  }

  async delete(userId: string, taskId: string) {
    if (!(await this.hasAccess(userId, taskId))) {
      throw new HttpException('Forbidden.', 403);
    }
    await this.taskRepository.delete({
      id: taskId,
    });
  }
  async mark(userId: string, taskId: string, done: boolean) {
    if (!(await this.hasAccess(userId, taskId))) {
      throw new HttpException('Forbidden.', 403);
    }
    await this.taskRepository.update(
      {
        id: taskId,
      },
      {
        done,
      },
    );
  }
  async list(userId: string, projectId: string) {
    if (!(await this.projectService.hasAccess(userId, projectId))) {
      throw new HttpException('Forbidden.', 403);
    }
    return this.taskRepository.find({
      where: {
        projectId,
      },
    });
  }
}
