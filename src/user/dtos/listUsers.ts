import { IsNumber } from 'class-validator';

export class ListUsersDto {
  @IsNumber()
  take: number;

  @IsNumber()
  skip: number;
}
