import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiUseTags } from '@nestjs/swagger';

@ApiUseTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async list() {
    return await this.userService.listUsers();
  }
}
