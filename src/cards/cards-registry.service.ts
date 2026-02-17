import { Injectable } from '@nestjs/common';
import { ICard, ICardBase } from './types/cards.types';
import { nanomaterialsCards } from './registry/nanomaterials/nanomaterials.cards';
import { psiEnergyCards } from './registry/psiEnergy/psiEnergy.cards';
import { dronesCards } from './registry/drones/drones.cards';

const cards: ICard[] = [
  ...nanomaterialsCards,
  ...psiEnergyCards,
  ...dronesCards,
];

@Injectable()
export class CardRegistry {
  private readonly cardMap = new Map<string, ICard>();

  constructor() {
    cards.forEach((card) => {
      this.cardMap.set(card.id, card);
    });
  }

  getCard(id: string): ICard | undefined {
    return this.cardMap.get(id);
  }

  getPublicCards(): ICardBase[] {
    return Array.from(this.cardMap.values()).map(
      ({ effect: _effect, ...card }) => card,
    );
  }
}
