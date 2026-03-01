import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { PlayerDto } from '../dto/player.dto';
import { HydratedDocument } from 'mongoose';
import { IPlayerGameState } from '../types/game.types';
import { IActiveCard, ICardBase } from 'src/cards/types/cards.types';

export type GameStatus = 'waiting' | 'active' | 'finished';

export type GameDocument = HydratedDocument<Game>;

@Schema({ timestamps: true })
export class Game {
  @Prop({ required: true })
  description: string;

  @Prop({ type: Object, required: true })
  owner: PlayerDto;

  @Prop({ type: [Object], default: [] })
  players: IPlayerGameState[];

  @Prop({ required: true, default: 0 })
  currentPlayer: 0 | 1;

  @Prop({ required: true, default: 1 })
  turn: number;

  @Prop({ type: [Object], default: [] })
  deck: ICardBase[];

  @Prop({ type: [Object], default: [] })
  activeCards: IActiveCard[];

  @Prop({ type: [Object], default: [] })
  discardPile: ICardBase[];

  @Prop({ default: 'waiting' })
  status: GameStatus;

  @Prop({ type: String, default: null })
  winnerId?: string | null;

  @Prop({ type: Date, default: null })
  finishedAt?: Date | null;

  createdAt: Date;
  updatedAt: Date;
}

export const GameSchema = SchemaFactory.createForClass(Game);

// ✅ Virtual поле "id" как string, для фронтенда и TS
GameSchema.virtual('id').get(function () {
  return this._id.toString();
});

// чтобы virtual отображалось при конвертации в JSON
GameSchema.set('toJSON', {
  virtuals: true,
});
GameSchema.set('toObject', {
  virtuals: true,
});
