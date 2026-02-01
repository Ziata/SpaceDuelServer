import { IsString, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { PlayerDto } from './player.dto';

export class CreateGameDto {
  @IsString()
  description: string;

  @ValidateNested()
  @Type(() => PlayerDto)
  owner: PlayerDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PlayerDto)
  players: PlayerDto[];
}
