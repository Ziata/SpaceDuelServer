import { IFullActiveGame } from 'src/games/types/game.types';

export type ResourceType = 'nanomaterials' | 'psiEnergy' | 'drones';

export interface ICardBase {
  id: string;
  name: string;
  type: ResourceType;
  cost: number;
  description: string;
}

export interface ICard extends ICardBase {
  effect: (state: IFullActiveGame, playerIndex: number) => IFullActiveGame;
}
