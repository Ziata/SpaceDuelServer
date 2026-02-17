import { IFullActiveGame } from 'src/games/types/game.types';

export function clonePlayers(state: IFullActiveGame) {
  return state.players.map((p) => ({
    ...p,
    production: { ...p.production },
  })) as typeof state.players;
}

export function endTurn(state: IFullActiveGame) {
  state.turn += 1;
  state.currentPlayer = state.currentPlayer === 0 ? 1 : 0;
}
