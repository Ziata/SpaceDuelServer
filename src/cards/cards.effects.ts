import { IFullActiveGame } from 'src/games/types/game.types';

function clonePlayers(state: IFullActiveGame) {
  return state.players.map((p) => ({
    ...p,
    production: { ...p.production },
  })) as typeof state.players;
}

/* 001 */
export function terraformOrbit(
  state: IFullActiveGame,
  playerIndex: number,
): IFullActiveGame {
  const players = clonePlayers(state);

  players[playerIndex].planetIntegrity += 10;

  state.turn += 1;
  state.currentPlayer = state.currentPlayer === 0 ? 1 : 0;

  return { ...state, players };
}

/* 002 */
export function droneSwarmAssault(
  state: IFullActiveGame,
  playerIndex: number,
): IFullActiveGame {
  const players = clonePlayers(state);
  const enemyIndex = playerIndex === 0 ? 1 : 0;

  const damage = 8;
  const shieldDamage = Math.min(players[enemyIndex].orbitalShield, damage);

  const remaining = damage - shieldDamage;

  state.turn += 1;
  state.currentPlayer = state.currentPlayer === 0 ? 1 : 0;

  players[enemyIndex].orbitalShield -= shieldDamage;
  players[enemyIndex].planetIntegrity -= remaining;

  return { ...state, players };
}

/* 003 */
export function planetaryPsiReactor(
  state: IFullActiveGame,
  playerIndex: number,
): IFullActiveGame {
  const players = clonePlayers(state);

  players[playerIndex].production.psiEnergy += 1;

  state.turn += 1;
  state.currentPlayer = state.currentPlayer === 0 ? 1 : 0;

  return { ...state, players };
}

/* 004 */
export function nanomaterialBoost(
  state: IFullActiveGame,
  playerIndex: number,
): IFullActiveGame {
  const players = clonePlayers(state);

  players[playerIndex].production.nanomaterials += 2;
  state.turn += 1;
  state.currentPlayer = state.currentPlayer === 0 ? 1 : 0;

  return { ...state, players };
}

/* 005 */
export function shieldModulation(
  state: IFullActiveGame,
  playerIndex: number,
): IFullActiveGame {
  const players = clonePlayers(state);
  players[playerIndex].orbitalShield += 8;
  state.turn += 1;
  state.currentPlayer = state.currentPlayer === 0 ? 1 : 0;
  return { ...state, players };
}

/* 006 */
export function psiBlast(
  state: IFullActiveGame,
  playerIndex: number,
): IFullActiveGame {
  const players = clonePlayers(state);
  const enemyIndex = playerIndex === 0 ? 1 : 0;

  players[enemyIndex].orbitalShield = Math.max(
    0,
    players[enemyIndex].orbitalShield - 10,
  );
  state.turn += 1;
  state.currentPlayer = state.currentPlayer === 0 ? 1 : 0;
  return { ...state, players };
}

/* 007 */
export function droneReinforcement(
  state: IFullActiveGame,
  playerIndex: number,
): IFullActiveGame {
  const players = clonePlayers(state);
  const enemyIndex = playerIndex === 0 ? 1 : 0;

  const damage = 6;
  const shieldDamage = Math.min(players[enemyIndex].orbitalShield, damage);

  const remaining = damage - shieldDamage;

  players[enemyIndex].orbitalShield -= shieldDamage;
  players[enemyIndex].planetIntegrity -= remaining;

  players[playerIndex].planetIntegrity += 5;

  state.turn += 1;
  state.currentPlayer = state.currentPlayer === 0 ? 1 : 0;
  return { ...state, players };
}

/* 008 */
export function planetCloaking(
  state: IFullActiveGame,
  playerIndex: number,
): IFullActiveGame {
  const players = clonePlayers(state);

  players[playerIndex].orbitalShield += 5;
  players[playerIndex].planetIntegrity += 3;

  state.turn += 1;
  state.currentPlayer = state.currentPlayer === 0 ? 1 : 0;

  return { ...state, players };
}

/* 009 */
export function droneCriticalStrike(
  state: IFullActiveGame,
  playerIndex: number,
): IFullActiveGame {
  const players = clonePlayers(state);
  const enemyIndex = playerIndex === 0 ? 1 : 0;

  players[enemyIndex].planetIntegrity -= 15;

  state.turn += 1;
  state.currentPlayer = state.currentPlayer === 0 ? 1 : 0;

  return { ...state, players };
}

/* 010 */
export function shieldRepairArray(
  state: IFullActiveGame,
  playerIndex: number,
): IFullActiveGame {
  const players = clonePlayers(state);

  players[playerIndex].orbitalShield += 12;

  state.turn += 1;
  state.currentPlayer = state.currentPlayer === 0 ? 1 : 0;

  return { ...state, players };
}
