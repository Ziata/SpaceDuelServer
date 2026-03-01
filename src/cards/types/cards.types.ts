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
  effect: (state: IFullActiveGame, playerIndex: 1 | 0) => IFullActiveGame;
}

export interface IActiveCard extends ICard {
  playerId: string;
  isDiscard: boolean;
}

export enum DamageType {
  NORMAL = 'normal',
  SHIELD_ONLY = 'shield_only',
  PLANET_ONLY = 'planet_only',
}
