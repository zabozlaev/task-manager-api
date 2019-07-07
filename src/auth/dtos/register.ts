import { IsNotEmpty, IsString, IsEmail, Length } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiModelProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiModelProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  @Length(8, 32)
  password: string;
}
