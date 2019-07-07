import {
  Controller,
  Get,
  Post,
  UseGuards,
  Req,
  Body,
  Delete,
  Param,
  HttpStatus,
  HttpCode,
  Put,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dtos/createTask';
import { MarkTaskDto } from './dtos/markTask';
import {
  ApiOkResponse,
  ApiResponse,
  ApiForbiddenResponse,
  ApiUnauthorizedResponse,
  ApiUseTags,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiUseTags('tasks')
@ApiBearerAuth()
@Controller('tasks')
@UseGuards(AuthGuard)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  @ApiOkResponse({ description: 'Here are your tasks.' })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized.',
  })
  @ApiForbiddenResponse({
    description: 'You do not have access to this resource.',
  })
  async list(@Req() req, @Body() { projectId }) {
    return await this.taskService.list(req.user.id, projectId);
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Created.',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized.',
  })
  @ApiForbiddenResponse({
    description: 'You do not have access to this resource.',
  })
  async create(@Req() req, @Body() body: CreateTaskDto) {
    return await this.taskService.create(req.user.id, body);
  }
  @Put(':id')
  @HttpCode(202)
  @ApiResponse({ status: 202, description: 'You have marked the task done.' })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized.',
  })
  @ApiForbiddenResponse({
    description: 'You do not have access to this resource.',
  })
  async mark(
    @Req() req,
    @Param('id') taskId: string,
    @Body() { done = true }: MarkTaskDto,
  ) {
    return await this.taskService.mark(req.user.id, taskId, done);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Req() req, @Param('id') taskId: string) {
    return await this.taskService.delete(req.user.id, taskId);
  }
}
