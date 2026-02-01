import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type GameDocument = Game & Document;

@Schema({ timestamps: true })
export class Game {
  @Prop({ required: true })
  description: string;

  @Prop({ type: Object, required: true })
  owner: Record<string, any>;

  @Prop({ type: [Object], default: [] })
  players: Record<string, any>[];
}

export const GameSchema = SchemaFactory.createForClass(Game);
