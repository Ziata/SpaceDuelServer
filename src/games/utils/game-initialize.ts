import { IPlayerGameState } from '../types/game.types';
import { GameDocument } from '../schemas/game.schema';
import { CardRegistry } from 'src/cards/cards-registry.service';

export function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export function initializePlayersFromIds(
  game: GameDocument,
  cardRegistry: CardRegistry,
): GameDocument {
  const allCards = cardRegistry.getPublicCards();

  const shuffledDeck = shuffleArray(allCards);

  // Распределяем карты каждому игроку
  const playersState: IPlayerGameState[] = game.players.map((user) => {
    const hand = shuffledDeck.splice(0, 6);
    return {
      id: user.id,
      name: user.name,
      planetIntegrity: 50,
      orbitalShield: 20,
      resources: { nanomaterials: 5, psiEnergy: 5, drones: 5 },
      production: { nanomaterials: 2, psiEnergy: 2, drones: 2 },
      hand,
    };
  });

  // Мутируем существующий документ Mongoose
  game.players = playersState;
  game.deck = shuffledDeck;
  game.discardPile = [];

  return game;
}
