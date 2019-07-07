import { IsString, IsAlphanumeric, IsNotEmpty } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  name?: string;

  @IsString()
  @IsAlphanumeric()
  password?: string;
}
