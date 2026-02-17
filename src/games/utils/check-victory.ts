import { GameDocument } from '../schemas/game.schema';

export const checkVictory = (game: GameDocument) => {
  for (const player of game.players) {
    const opponent = game.players.find((p) => p.id !== player.id);
    if (!opponent) continue;

    const resourcesWin =
      player.resources.nanomaterials >= 150 &&
      player.resources.psiEnergy >= 150 &&
      player.resources.drones >= 150;

    const planetWin = player.planetIntegrity >= 100;
    const destroyOpponent = opponent.planetIntegrity <= 0;

    if (resourcesWin || planetWin || destroyOpponent) {
      return player.id; // Возвращаем ID победителя
    }
  }

  return null;
};
