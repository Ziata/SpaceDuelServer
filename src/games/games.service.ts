import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Game, GameDocument } from './schemas/game.schema';

@Injectable()
export class GamesService {
  constructor(@InjectModel(Game.name) private gameModel: Model<GameDocument>) {}

  // Create
  async create(data: Partial<Game>): Promise<Game> {
    const game = new this.gameModel(data);
    return game.save();
  }

  // Read all
  async findAll(): Promise<Game[]> {
    return this.gameModel.find().exec();
  }

  // Read one
  async findOne(id: string): Promise<Game | null> {
    return this.gameModel.findById(id).exec();
  }

  // Update
  async update(id: string, data: Partial<Game>): Promise<Game | null> {
    return this.gameModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  // Delete
  async remove(id: string): Promise<Game | null> {
    return this.gameModel.findByIdAndDelete(id).exec();
  }
}
