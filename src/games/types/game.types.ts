import { ICardBase } from 'src/cards/types/cards.types';

export interface IGame {
  _id: string;
  description: string;
  players: IUser[];
  owner: IUser;
  createdAt: Date;
}

export interface ICreateGameRequest {
  description: string;
  owner: IUser;
  players: IUser[];
}

export interface IActiveGame {
  id: string;
  description: string;
  owner: IUser;
  createdAt: Date;
  currentPlayer: 0 | 1;
  turn: number;
  players: IPlayerPublicState[];
  playerState?: IPlayerGameState;
  opponent?: IPlayerPublicState;
  requestedUserId?: string;
  deck: ICardBase[];
}

export interface IFullActiveGame {
  id: string;
  description: string;
  owner: IUser;
  createdAt: Date;
  currentPlayer: 0 | 1;
  turn: number;
  players: IPlayerGameState[];
  deck: ICardBase[];
}

export interface IUser {
  name: string;
  id: string;
}

export type ResourceType = 'nanomaterials' | 'psiEnergy' | 'drones';

// === Полное состояние игрока (на сервере) ===
export interface IPlayerGameState extends IUser {
  planetIntegrity: number;
  orbitalShield: number;
  resources: Record<ResourceType, number>;
  production: Record<ResourceType, number>;
  hand: ICardBase[];
}

// === Игрок БЕЗ руки (то, что видят все) ===
export type IPlayerPublicState = Omit<IPlayerGameState, 'hand'>;
