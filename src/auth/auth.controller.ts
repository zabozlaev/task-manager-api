import { Controller, Post, Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dtos/register';
import { LoginDto } from './dtos/login';
import { LoginResponse } from './responses/login.response';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiUseTags,
} from '@nestjs/swagger';

@ApiUseTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/')
  @ApiOkResponse({
    description: 'You got your token.',
    type: LoginResponse,
  })
  @ApiUnauthorizedResponse({
    description: 'Incorrect credentials.',
  })
  async signin(@Body() body: LoginDto): Promise<LoginResponse> {
    const token = await this.authService.signin(body);
    return {
      token,
    };
  }

  @Post('/')
  @ApiCreatedResponse({
    description: 'You have successfuly signed up.',
  })
  async signup(@Body() body: RegisterDto) {
    return await this.authService.signup(body);
  }
}
