import { IsEmail, IsAlphanumeric } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiModelProperty()
  @IsEmail()
  email: string;

  @ApiModelProperty()
  @IsAlphanumeric()
  password: string;
}
