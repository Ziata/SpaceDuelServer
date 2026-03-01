import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Game, GameDocument } from './schemas/game.schema';
import { CreateGameDto } from './dto/game.dto';
import { PlayerDto } from './dto/player.dto';
import {
  initializePlayersFromIds,
  shuffleArray,
} from './utils/game-initialize';
import { IPlayerGameState, IPlayerPublicState } from './types/game.types';
import { CardRegistry } from 'src/cards/cards-registry.service';
import { checkVictory } from './utils/check-victory';

@Injectable()
export class GamesService {
  constructor(
    @InjectModel(Game.name) private gameModel: Model<GameDocument>,
    private readonly cardRegistry: CardRegistry,
  ) {}

  // Create
  async create(data: CreateGameDto): Promise<GameDocument> {
    const game = new this.gameModel(data);
    return game.save();
  }

  // Read all
  async findAll(): Promise<Game[]> {
    return this.gameModel.find().exec();
  }

  async findAllActive(): Promise<Game[]> {
    return this.gameModel
      .find({ status: { $ne: 'finished' } })
      .lean()
      .exec();
  }

  // Read one
  async findOne(id: string): Promise<Game | null> {
    return this.gameModel.findById(id).lean().exec();
  }

  // Update
  async update(id: string, data: Partial<Game>): Promise<Game | null> {
    return this.gameModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  // Delete
  async remove(id: string): Promise<Game | null> {
    return this.gameModel.findByIdAndDelete(id).exec();
  }

  serializeGameForPlayer(game: Game, userId?: string) {
    if (!game) return;

    const stripHand = (player: IPlayerGameState): IPlayerPublicState => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { hand, ...rest } = player;
      return rest;
    };

    const current = userId
      ? game.players.find((p) => p.id === userId)
      : undefined;
    const opponent = userId
      ? game.players.find((p) => p.id !== userId)
      : undefined;

    if (current && opponent) {
      return {
        ...game,
        requestedUserId: userId,
        playerState: current, // игрок с рукой
        opponent: stripHand(opponent), // противник без руки
        players: game.players.map(stripHand), // массив игроков без руки
      };
    }

    // userId не передан или игрок не найден
    return {
      ...game,
      players: game.players.map(stripHand),
    };
  }

  async addPlayer(gameId: string, player: PlayerDto): Promise<GameDocument> {
    const game = await this.gameModel.findById(gameId);
    if (!game) throw new Error('Game not found');
    if (!game.players.some((p) => p.id === player.id)) {
      game.players.push({
        ...player,
        planetIntegrity: 50,
        orbitalShield: 20,
        resources: { nanomaterials: 5, psiEnergy: 5, drones: 5 },
        production: { nanomaterials: 2, psiEnergy: 2, drones: 2 },
        hand: [],
      });

      if (game.players.length === 2) {
        game.status = 'active';
      }

      initializePlayersFromIds(game, this.cardRegistry);
      await game.save();
    }

    return game;
  }

  async playCard(gameId: string, playerId: string, cardId: string) {
    try {
      // 1️⃣ Получаем игру из базы
      const game = await this.gameModel.findById(gameId);
      if (!game) return { error: 'Game not found' };

      // 2️⃣ Находим индекс игрока
      const playerIndex = game.players.findIndex((p) => p.id === playerId);
      if (playerIndex === -1) return { error: 'Player not found' };

      // 3️⃣ Проверяем, ход ли этого игрока
      if (game.currentPlayer !== playerIndex) return { error: 'Not your turn' };

      // 4️⃣ Получаем карту из registry
      const card = this.cardRegistry.getCard(cardId);
      if (!card) return { error: 'Card not found' };

      // добавляем на поле
      if (
        !game.activeCards.length ||
        game.activeCards[0].playerId !== playerId
      ) {
        game.activeCards = [
          {
            ...card,
            isDiscard: false,
            playerId,
          },
        ];
      } else {
        game.activeCards = [
          ...game.activeCards,
          { ...card, isDiscard: false, playerId },
        ];
      }
      const player = game.players[playerIndex];

      // 5️⃣ Проверяем хватает ли ресурсов
      if (player.resources[card.type] < card.cost)
        return { error: 'Not enough resources' };

      // -------------------------------------------------
      // 6️⃣ Списываем стоимость карты
      // -------------------------------------------------
      player.resources[card.type] -= card.cost;

      // -------------------------------------------------
      // 7️⃣ Применяем эффект карты
      // ВАЖНО: effect сам управляет:
      // - сменой хода
      // - увеличением turn
      // - изменением состояния
      // -------------------------------------------------
      const plainGame = game.toObject({ virtuals: true });
      const newGameState = card.effect(plainGame, playerIndex);

      // Перезаписываем игроков и основные поля
      game.players = newGameState.players;
      game.currentPlayer = newGameState.currentPlayer;
      game.turn = newGameState.turn;
      // -------------------------------------------------
      // 8️⃣ Начисляем production игроку,
      // который только что сходил
      // -------------------------------------------------
      const updatedPlayer = game.players[playerIndex];

      Object.keys(updatedPlayer.resources).forEach((key) => {
        const resourceKey = key as keyof typeof updatedPlayer.resources;

        updatedPlayer.resources[resourceKey] +=
          updatedPlayer.production?.[resourceKey] ?? 0;
      });

      // -------------------------------------------------
      // 9️⃣ Работа с рукой
      // -------------------------------------------------

      // Удаляем карту из руки
      updatedPlayer.hand = updatedPlayer.hand.filter(
        (item) => item.id !== card.id,
      );

      // Перемещаем карту в сброс
      game.discardPile.push(card);

      // Берем новую карту
      const newCard = game.deck.shift();
      if (newCard) {
        updatedPlayer.hand.push(newCard);
      }

      // проверяемразмер колоды и возвращаем отбой если нужно
      if (game.deck.length === 0) {
        game.deck = shuffleArray(game.discardPile);
        game.discardPile = [];
      }

      // Проверка победы
      const winnerId = checkVictory(game);
      if (winnerId) {
        game.status = 'finished';
        game.winnerId = winnerId;
        game.finishedAt = new Date();
      }

      // -------------------------------------------------
      // 🔟 Сохраняем игру
      // -------------------------------------------------
      await game.save();

      if (winnerId) {
        return { winnerId };
      }
    } catch (err) {
      console.error(err);
      return { error: 'Internal server error' };
    }
  }

  async discardCard(gameId: string, playerId: string, cardId: string) {
    try {
      // 1️⃣ Получаем игру из базы данных
      const game = await this.gameModel.findById(gameId);
      if (!game) return { error: 'Game not found' };

      // 2️⃣ Определяем индекс текущего игрока
      const playerIndex = game.players.findIndex((p) => p.id === playerId);
      if (playerIndex === -1) return { error: 'Player not found' };

      // 3️⃣ Проверяем, действительно ли сейчас ход этого игрока
      if (game.currentPlayer !== playerIndex) return { error: 'Not your turn' };

      // 4️⃣ Получаем карту из реестра (чтобы корректно положить в сброс)
      const card = this.cardRegistry.getCard(cardId);
      if (!card) return { error: 'Card not found' };

      // добавляем на поле
      if (
        !game.activeCards.length ||
        game.activeCards[0].playerId !== playerId
      ) {
        game.activeCards = [
          {
            ...card,
            isDiscard: true,
            playerId,
          },
        ];
      } else {
        game.activeCards = [
          ...game.activeCards,
          { ...card, isDiscard: true, playerId },
        ];
      }

      // 5️⃣ Увеличиваем номер хода
      game.turn += 1;

      // -------------------------------------------------
      // 6️⃣ Начисляем ресурсы (production) игроку,
      // который завершает свой ход
      // -------------------------------------------------
      const updatedPlayer = game.players[playerIndex];

      Object.keys(updatedPlayer.resources).forEach((key) => {
        const resourceKey = key as keyof typeof updatedPlayer.resources;

        updatedPlayer.resources[resourceKey] +=
          updatedPlayer.production?.[resourceKey] ?? 0;
      });
      game.markModified(`players.${playerIndex}.resources`);

      // После изменения сброса или колоды:

      // -------------------------------------------------
      // 7️⃣ Работа с рукой игрока
      // -------------------------------------------------

      // Удаляем выбранную карту из руки
      updatedPlayer.hand = updatedPlayer.hand.filter(
        (item) => item.id !== card.id,
      );
      game.markModified(`players.${playerIndex}.hand`);

      // Перемещаем карту в сброс
      game.discardPile.push(card);
      game.markModified('discardPile');

      // Добираем новую карту из колоды
      const newCard = game.deck.shift();
      if (newCard) {
        updatedPlayer.hand.push(newCard);
      }
      game.markModified('deck');

      // -------------------------------------------------
      // 8️⃣ Передаём ход следующему игроку
      // -------------------------------------------------
      game.currentPlayer = game.currentPlayer === 0 ? 1 : 0;

      // Проверка победы
      const winnerId = checkVictory(game);

      if (winnerId) {
        game.status = 'finished';
        game.winnerId = winnerId;
        game.finishedAt = new Date();
      }

      // проверяемразмер колоды и возвращаем отбой если нужно
      if (game.deck.length === 0) {
        game.deck = shuffleArray(game.discardPile);
        game.discardPile = [];
      }

      // -------------------------------------------------
      // 9️⃣ Сохраняем обновлённое состояние игры
      // -------------------------------------------------
      await game.save();

      // -------------------------------------------------
      // 🔟 Проверяем условия победы
      // -------------------------------------------------

      if (winnerId) {
        return { winnerId };
      }
    } catch (err) {
      console.error(err);
      return { error: 'Internal server error' };
    }
  }
}
