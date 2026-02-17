import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  ConnectedSocket,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { GamesService } from './games.service';
import { CreateGameDto } from './dto/game.dto';
import { PlayerDto } from './dto/player.dto';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class GamesGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly gamesService: GamesService) {}

  @SubscribeMessage('createGame')
  async handleCreateGame(@MessageBody() payload: CreateGameDto) {
    const game = await this.gamesService.create(payload);

    // Рассылаем всем клиентам
    this.server.emit('gameCreated', game);

    // Создателя сразу добавляем в комнату
    this.server.socketsJoin(game._id.toString());
  }

  @SubscribeMessage('deleteGame')
  async handleDeleteGame(@MessageBody() payload: { gameId: string }) {
    await this.gamesService.remove(payload.gameId);

    // Говорим всем удалить из списка
    this.server.emit('gameDeleted', payload.gameId);
  }

  // 1️⃣ Создатель игры заходит в комнату
  @SubscribeMessage('joinGameRoom')
  async handleJoinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: { gameId: string; userId: string },
  ) {
    await client.join(payload.gameId);
    client.data.userId = payload.userId;
  }

  // 2️⃣ Второй игрок нажимает "Join"
  @SubscribeMessage('playerJoin')
  async handlePlayerJoin(
    @ConnectedSocket() client: Socket,
    @MessageBody()
    payload: { gameId: string; user: PlayerDto },
  ) {
    // Добавляем игрока в БД и создаем игру
    const updatedGame = await this.gamesService.addPlayer(
      payload.gameId,
      payload.user,
    );

    if (updatedGame) {
      await client.join(payload.gameId);
      // Проверяем — если игроков теперь 2, стартуем игру

      if (updatedGame.players.length >= 2) {
        this.server.to(payload.gameId).emit('gameStarted', {
          gameId: payload.gameId,
        });
      } else {
        // Если ещё не старт — просто обновляем игроков
        this.server.to(payload.gameId).emit('playerJoined', updatedGame);
      }
    }
  }

  @SubscribeMessage('playCard')
  async handlePlayCard(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { gameId: string; cardId: string; playerId: string },
  ) {
    try {
      const result = await this.gamesService.playCard(
        data.gameId,
        data.playerId,
        data.cardId,
      );

      const game = await this.gamesService.findOne(data.gameId);
      if (!game) return;

      const room = this.server.sockets.adapter.rooms.get(data.gameId);
      if (!room) return;

      // Отправляем каждому игроку приватное состояние
      for (const socketId of room) {
        const socket = this.server.sockets.sockets.get(socketId);
        if (!socket || !socket.data.userId) continue;

        const serialized = this.gamesService.serializeGameForPlayer(
          game,
          socket.data.userId as string,
        );
        socket.emit('playCard', serialized);
      }

      // Если есть победитель, уведомляем всех
      if (result?.winnerId) {
        this.server
          .to(data.gameId)
          .emit('gameEnded', { winnerId: result.winnerId });
      }
    } catch (err) {
      client.emit('error', err);
    }
  }

  @SubscribeMessage('discardCard')
  async handleDiscardCard(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { gameId: string; cardId: string; playerId: string },
  ) {
    try {
      const result = await this.gamesService.discardCard(
        data.gameId,
        data.playerId,
        data.cardId,
      );

      const game = await this.gamesService.findOne(data.gameId);
      if (!game) return;

      const room = this.server.sockets.adapter.rooms.get(data.gameId);
      if (!room) return;

      // Отправляем каждому игроку приватное состояние
      for (const socketId of room) {
        const socket = this.server.sockets.sockets.get(socketId);
        if (!socket || !socket.data.userId) continue;

        const serialized = this.gamesService.serializeGameForPlayer(
          game,
          socket.data.userId as string,
        );
        socket.emit('discardCard', serialized);
      }

      // Если есть победитель, уведомляем всех
      if (result?.winnerId) {
        this.server
          .to(data.gameId)
          .emit('gameEnded', { winnerId: result.winnerId });
      }
    } catch (err) {
      client.emit('error', err);
    }
  }
}
