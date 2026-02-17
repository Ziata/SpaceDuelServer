import { clonePlayers, endTurn } from 'src/cards/utils';
import { IFullActiveGame } from 'src/games/types/game.types';

// =====================
// Карты наноматериалов
// =====================

/* nm_001 */
export function unstableOre(
  state: IFullActiveGame,
  _: number,
): IFullActiveGame {
  const players = clonePlayers(state);
  players.forEach(
    (p) =>
      (p.resources.nanomaterials = Math.max(0, p.resources.nanomaterials - 8)),
  );
  endTurn(state);
  return { ...state, players };
}

/* nm_002 */
export function seismicShock(
  state: IFullActiveGame,
  _: number,
): IFullActiveGame {
  const players = clonePlayers(state);
  players.forEach(
    (p) =>
      (p.resources.nanomaterials = Math.max(0, p.resources.nanomaterials - 1)),
  ); // -1 шахта аналог
  endTurn(state);
  return { ...state, players };
}

/* nm_003 */
export function asteroidCollapse(
  state: IFullActiveGame,
  playerIndex: number,
): IFullActiveGame {
  const players = clonePlayers(state);
  const enemyIndex = playerIndex === 0 ? 1 : 0;
  players[playerIndex].planetIntegrity += 10;
  players[playerIndex].resources.psiEnergy += 5; // аналог маны
  players[enemyIndex].resources.nanomaterials = Math.max(
    0,
    players[enemyIndex].resources.nanomaterials - 1,
  ); // -1 шахта
  endTurn(state);
  return { ...state, players };
}

/* nm_004 */
export function quantumCoin(
  state: IFullActiveGame,
  playerIndex: number,
): IFullActiveGame {
  const players = clonePlayers(state);
  players[playerIndex].resources.nanomaterials += 2;
  players[playerIndex].resources.psiEnergy += 2;
  state.turn += 1; // играем снова
  return { ...state, players };
}

/* nm_005 */
export function terraCore(
  state: IFullActiveGame,
  playerIndex: number,
): IFullActiveGame {
  const players = clonePlayers(state);
  players[playerIndex].planetIntegrity += 1;
  state.turn += 1; // играем снова
  return { ...state, players };
}

/* nm_006 */
export function mineralGarden(
  state: IFullActiveGame,
  playerIndex: number,
): IFullActiveGame {
  const players = clonePlayers(state);
  players[playerIndex].planetIntegrity += 1;
  players[playerIndex].resources.psiEnergy += 2;
  endTurn(state);
  return { ...state, players };
}

/* nm_007 */
export function orbitalInnovation(
  state: IFullActiveGame,
  playerIndex: number,
): IFullActiveGame {
  const players = clonePlayers(state);
  players.forEach((p) => (p.resources.nanomaterials += 1));
  players[playerIndex].resources.psiEnergy += 4;
  endTurn(state);
  return { ...state, players };
}

/* nm_008 */
export function basicShield(
  state: IFullActiveGame,
  playerIndex: number,
): IFullActiveGame {
  const players = clonePlayers(state);
  players[playerIndex].planetIntegrity += 3;
  endTurn(state);
  return { ...state, players };
}

/* nm_009 */
export function overtimeShield(
  state: IFullActiveGame,
  playerIndex: number,
): IFullActiveGame {
  const players = clonePlayers(state);
  players[playerIndex].planetIntegrity += 5;
  players[playerIndex].resources.psiEnergy = Math.max(
    0,
    players[playerIndex].resources.psiEnergy - 6,
  );
  endTurn(state);
  return { ...state, players };
}

/* nm_010 */
export function planetaryWall(
  state: IFullActiveGame,
  playerIndex: number,
): IFullActiveGame {
  const players = clonePlayers(state);
  players[playerIndex].planetIntegrity += 4;
  endTurn(state);
  return { ...state, players };
}

/* nm_011 */
export function foundationArray(
  state: IFullActiveGame,
  playerIndex: number,
): IFullActiveGame {
  const players = clonePlayers(state);
  players[playerIndex].planetIntegrity +=
    players[playerIndex].planetIntegrity === 0 ? 5 : 3;
  endTurn(state);
  return { ...state, players };
}

/* nm_012 */
export function orbitalMines(
  state: IFullActiveGame,
  playerIndex: number,
): IFullActiveGame {
  const players = clonePlayers(state);
  players[playerIndex].resources.nanomaterials += 1;
  endTurn(state);
  return { ...state, players };
}

/* nm_013 */
export function asteroidVein(
  state: IFullActiveGame,
  playerIndex: number,
): IFullActiveGame {
  const players = clonePlayers(state);
  const enemyIndex = playerIndex === 0 ? 1 : 0;
  players[playerIndex].resources.nanomaterials +=
    players[playerIndex].resources.nanomaterials <
    players[enemyIndex].resources.nanomaterials
      ? 2
      : 1;
  endTurn(state);
  return { ...state, players };
}

/* nm_014 */
export function mineCollapse(
  state: IFullActiveGame,
  playerIndex: number,
): IFullActiveGame {
  const players = clonePlayers(state);
  const enemyIndex = playerIndex === 0 ? 1 : 0;
  players[enemyIndex].resources.nanomaterials = Math.max(
    0,
    players[enemyIndex].resources.nanomaterials - 1,
  );
  endTurn(state);
  return { ...state, players };
}

/* nm_015 */
export function techHijack(
  state: IFullActiveGame,
  playerIndex: number,
): IFullActiveGame {
  const players = clonePlayers(state);
  const enemyIndex = playerIndex === 0 ? 1 : 0;
  if (
    players[playerIndex].resources.nanomaterials <
    players[enemyIndex].resources.nanomaterials
  ) {
    players[playerIndex].resources.nanomaterials =
      players[enemyIndex].resources.nanomaterials;
  }
  endTurn(state);
  return { ...state, players };
}

/* nm_016 */
export function reinforcedPlating(
  state: IFullActiveGame,
  playerIndex: number,
): IFullActiveGame {
  const players = clonePlayers(state);
  players[playerIndex].planetIntegrity += 6;
  endTurn(state);
  return { ...state, players };
}

/* nm_017 */
export function subterraneanStreams(
  state: IFullActiveGame,
  playerIndex: number,
): IFullActiveGame {
  const players = clonePlayers(state);
  const enemyIndex = playerIndex === 0 ? 1 : 0;
  if (
    players[playerIndex].planetIntegrity < players[enemyIndex].planetIntegrity
  ) {
    players[playerIndex].planetIntegrity += 2;
  }
  endTurn(state);
  return { ...state, players };
}

/* nm_018 */
export function orbitalDrill(
  state: IFullActiveGame,
  playerIndex: number,
): IFullActiveGame {
  const players = clonePlayers(state);
  players[playerIndex].resources.nanomaterials += 2;
  endTurn(state);
  return { ...state, players };
}

/* nm_019 */
export function cosmicExcavator(
  state: IFullActiveGame,
  playerIndex: number,
): IFullActiveGame {
  const players = clonePlayers(state);
  players[playerIndex].resources.nanomaterials += 2;
  players[playerIndex].planetIntegrity += 1;
  endTurn(state);
  return { ...state, players };
}

/* nm_020 */
export function laborArray(
  state: IFullActiveGame,
  playerIndex: number,
): IFullActiveGame {
  const players = clonePlayers(state);
  players[playerIndex].planetIntegrity += 9;
  // теряет 5 отрядов аналогично
  endTurn(state);
  return { ...state, players };
}

/* nm_021 */
export function shockwave(state: IFullActiveGame, _: number): IFullActiveGame {
  const players = clonePlayers(state);
  players.forEach(
    (p) => (p.planetIntegrity = Math.max(0, p.planetIntegrity - 5)),
  );
  state.turn += 1; // играем снова
  return { ...state, players };
}

/* nm_022 */
export function grandShield(
  state: IFullActiveGame,
  playerIndex: number,
): IFullActiveGame {
  const players = clonePlayers(state);
  players[playerIndex].planetIntegrity += 8;
  endTurn(state);
  return { ...state, players };
}

/* nm_023 */
export function hiddenCavity(
  state: IFullActiveGame,
  playerIndex: number,
): IFullActiveGame {
  const players = clonePlayers(state);
  players[playerIndex].resources.psiEnergy += 1;
  state.turn += 1; // играем снова
  return { ...state, players };
}

/* nm_024 */
export function orbitalVault(
  state: IFullActiveGame,
  playerIndex: number,
): IFullActiveGame {
  const players = clonePlayers(state);
  players[playerIndex].planetIntegrity += 5;
  players[playerIndex].resources.drones += 1;
  endTurn(state);
  return { ...state, players };
}

/* nm_025 */
export function plasmaSpire(
  state: IFullActiveGame,
  playerIndex: number,
): IFullActiveGame {
  const players = clonePlayers(state);
  players[playerIndex].planetIntegrity += 7;
  players[playerIndex].resources.psiEnergy += 7;
  endTurn(state);
  return { ...state, players };
}

/* nm_026 */
export function orbitalBarricade(
  state: IFullActiveGame,
  playerIndex: number,
): IFullActiveGame {
  const players = clonePlayers(state);
  players[playerIndex].planetIntegrity += 6;
  players[playerIndex].resources.drones += 6;
  endTurn(state);
  return { ...state, players };
}

/* nm_027 */
export function stellarCore(
  state: IFullActiveGame,
  playerIndex: number,
): IFullActiveGame {
  const players = clonePlayers(state);
  players[playerIndex].planetIntegrity += 6;
  players[playerIndex].resources.psiEnergy += 3;
  endTurn(state);
  return { ...state, players };
}

/* nm_028 */
export function orbitalBastion(
  state: IFullActiveGame,
  playerIndex: number,
): IFullActiveGame {
  const players = clonePlayers(state);
  players[playerIndex].planetIntegrity += 12;
  endTurn(state);
  return { ...state, players };
}

/* nm_029 */
export function fortifyArray(
  state: IFullActiveGame,
  playerIndex: number,
): IFullActiveGame {
  const players = clonePlayers(state);
  players[playerIndex].planetIntegrity += 7;
  const enemyIndex = playerIndex === 0 ? 1 : 0;
  players[enemyIndex].planetIntegrity = Math.max(
    0,
    players[enemyIndex].planetIntegrity - 6,
  );
  endTurn(state);
  return { ...state, players };
}

/* nm_030 */
export function newFrontiers(
  state: IFullActiveGame,
  playerIndex: number,
): IFullActiveGame {
  const players = clonePlayers(state);
  players[playerIndex].planetIntegrity += 8;
  players[playerIndex].resources.psiEnergy += 5;
  endTurn(state);
  return { ...state, players };
}

/* nm_031 */
export function ultimateShield(
  state: IFullActiveGame,
  playerIndex: number,
): IFullActiveGame {
  const players = clonePlayers(state);
  players[playerIndex].planetIntegrity += 15;
  endTurn(state);
  return { ...state, players };
}

/* nm_032 */
export function fieldSwap(
  state: IFullActiveGame,
  playerIndex: number,
): IFullActiveGame {
  const players = clonePlayers(state);
  const enemyIndex = playerIndex === 0 ? 1 : 0;
  const temp = players[playerIndex].planetIntegrity;
  players[playerIndex].planetIntegrity = players[enemyIndex].planetIntegrity;
  players[enemyIndex].planetIntegrity = temp;
  endTurn(state);
  return { ...state, players };
}

/* nm_033 */
export function orbitalCannon(
  state: IFullActiveGame,
  playerIndex: number,
): IFullActiveGame {
  const players = clonePlayers(state);
  const enemyIndex = playerIndex === 0 ? 1 : 0;
  players[playerIndex].planetIntegrity += 6;
  players[enemyIndex].planetIntegrity = Math.max(
    0,
    players[enemyIndex].planetIntegrity - 10,
  );
  endTurn(state);
  return { ...state, players };
}

/* nm_034 */
export function coreReactor(
  state: IFullActiveGame,
  playerIndex: number,
): IFullActiveGame {
  const players = clonePlayers(state);
  /*  const enemyIndex = playerIndex === 0 ? 1 : 0; */
  players[playerIndex].planetIntegrity += 20;
  players[playerIndex].resources.psiEnergy += 8;
  endTurn(state);
  return { ...state, players };
}
