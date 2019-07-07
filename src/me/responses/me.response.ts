import { ApiModelProperty } from '@nestjs/swagger';

export class MeResponse {
  @ApiModelProperty()
  id: string;

  @ApiModelProperty()
  email: string;

  @ApiModelProperty()
  name: string;

  @ApiModelProperty()
  createdAt: Date;
}
