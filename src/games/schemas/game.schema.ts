import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { PlayerDto } from '../dto/player.dto';

export type GameDocument = Game & Document;

@Schema({ timestamps: true })
export class Game {
  @Prop({ required: true })
  description: string;

  @Prop({ type: Object, required: true })
  owner: PlayerDto;

  @Prop({ type: [Object], default: [] })
  players: PlayerDto[];
}

export const GameSchema = SchemaFactory.createForClass(Game);
