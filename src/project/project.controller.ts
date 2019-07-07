import {
  Controller,
  UseGuards,
  Post,
  Req,
  Body,
  Get,
  Delete,
  Param,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateProjectDto } from './dtos/createProject';
import { ProjectService } from './project.service';
import {
  ApiResponse,
  ApiUnauthorizedResponse,
  ApiForbiddenResponse,
  ApiUseTags,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiUseTags('projects')
@Controller('projects')
@UseGuards(AuthGuard)
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  @ApiUnauthorizedResponse({
    description: 'Unauthorized.',
  })
  async list(@Req() req) {
    return await this.projectService.list(req.user.id);
  }

  @Post()
  @ApiUnauthorizedResponse({
    description: 'Unauthorized.',
  })
  @ApiForbiddenResponse({
    description: 'You do not have access to this resource.',
  })
  async create(@Body() body: CreateProjectDto, @Req() req) {
    return await this.projectService.create(req.user.id, body);
  }

  @Delete(':id')
  @ApiResponse({
    status: 204,
    description: 'You have deleted the project.',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized.',
  })
  @ApiForbiddenResponse({
    description: 'You do not have access to this resource.',
  })
  async delete(@Param('id') id: string, @Req() req) {
    return this.projectService.delete(req.user.id, id);
  }
}
