import { IsString, IsNotEmpty } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  projectId: string;
}
