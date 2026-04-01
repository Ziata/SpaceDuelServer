import { Injectable, Logger } from '@nestjs/common';
import { GamesService } from './games.service';
import { Server } from 'socket.io';

@Injectable()
export class GamesTimer {
  private server: Server;
  private logger = new Logger('GamesTimer');

  constructor(private readonly gamesService: GamesService) {}

  start(server: Server) {
    this.server = server;

    // Запускаем таймер раз в секунду
    setInterval(() => {
      void this.checkTurns();
    }, 1000);
  }

  private async checkTurns() {
    if (!this.server) return;

    const now = Date.now();

    try {
      const games = await this.gamesService.findAllActive();
      for (const game of games) {
        if (!game.turnEndsAt || now <= game.turnEndsAt) continue;

        const player = game.players[game.currentPlayer];
        if (!player || !player.hand?.length) continue;

        this.logger.log(
          `Auto-discard for player ${player.id} in game ${game.id}`,
        );

        // Выполняем discard через сервис
        await this.gamesService.discardCard(
          game._id.toString(),
          player.id,
          player.hand[0].id,
        );

        // Обновляем игру после discard
        const updatedGame = await this.gamesService.findOne(
          game._id.toString(),
        );
        if (!updatedGame) continue;

        // Отправляем события всем сокетам, которые могут быть в комнате
        const room = this.server.sockets.adapter.rooms.get(game._id.toString());
        if (room) {
          for (const socketId of room) {
            const socket = this.server.sockets.sockets.get(socketId);
            if (!socket || !socket.data.userId) continue;

            const serialized = this.gamesService.serializeGameForPlayer(
              updatedGame,
              socket.data.userId,
            );
            socket.emit('discardCard', {
              game: serialized,
              serverNow: Date.now(),
            });
          }
        }
      }
    } catch (err) {
      this.logger.error('checkTurns error', err);
    }
  }
}
