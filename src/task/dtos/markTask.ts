import { IsBoolean } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class MarkTaskDto {
  @ApiModelProperty()
  @IsBoolean()
  done: boolean;
}
