import { IsString } from 'class-validator';

export class PlayerDto {
  @IsString()
  id: string;

  @IsString()
  name: string;
}
