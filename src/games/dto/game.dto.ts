import { IsString, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';

export class UserDto {
  _id: string;
  name: string;
}

export class CreateGameDto {
  @IsString()
  description: string;

  @ValidateNested()
  @Type(() => UserDto)
  owner: UserDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UserDto)
  players: UserDto[];
}
