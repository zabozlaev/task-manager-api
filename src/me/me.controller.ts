import { Controller, Get, Req, UseGuards, Delete } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { MeResponse } from './responses/me.response';
import { ApiResponse, ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiUseTags('me')
@Controller('me')
@UseGuards(AuthGuard)
export class MeController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'You have successfuly got your data.',
    type: MeResponse,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized.',
  })
  async me(@Req() req): Promise<MeResponse> {
    return (await this.userService.me(req.user.id)) as MeResponse;
  }
}
