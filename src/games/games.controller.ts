import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { GamesService } from './games.service';
import { Game } from './schemas/game.schema';
import { CreateGameDto } from './dto/game.dto';

@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Post()
  create(@Body() dto: CreateGameDto) {
    return this.gamesService.create(dto);
  }

  @Get()
  findAll() {
    return this.gamesService.findAllActive();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gamesService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Partial<Game>) {
    return this.gamesService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gamesService.remove(id);
  }

  @Get(':id/active')
  async getActiveGame(
    @Param('id') id: string,
    @Query('userId') userId?: string,
  ) {
    const game = await this.gamesService.findOne(id);
    if (!game) throw new NotFoundException('Game not found');
    return this.gamesService.serializeGameForPlayer(game, userId);
  }
}
