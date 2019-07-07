import { ApiModelProperty } from '@nestjs/swagger';

export class ListUserResponse {
  @ApiModelProperty()
  id: string;
  @ApiModelProperty()
  name: string;
  @ApiModelProperty()
  createdAt: string;
}
