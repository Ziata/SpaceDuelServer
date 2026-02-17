import { clonePlayers, endTurn } from 'src/cards/utils';
import { IFullActiveGame } from 'src/games/types/game.types';

// =====================
// Карты psiEnergy (космический стиль)
// =====================

/* pe_001 */
export function quantumShard(
  state: IFullActiveGame,
  playerIndex: number,
): IFullActiveGame {
  const players = clonePlayers(state);
  const enemy = playerIndex === 0 ? 1 : 0;
  players[playerIndex].planetIntegrity +=
    players[playerIndex].planetIntegrity < players[enemy].planetIntegrity
      ? 2
      : 1;
  endTurn(state);
  return { ...state, players };
}

/* pe_002 */
export function nebulaCascade(
  state: IFullActiveGame,
  playerIndex: number,
): IFullActiveGame {
  const players = clonePlayers(state);
  players.forEach((p) => (p.planetIntegrity += 1));
  players[playerIndex].resources.psiEnergy += 3;
  endTurn(state);
  return { ...state, players };
}

/* pe_003 */
export function prismCore(
  state: IFullActiveGame,
  playerIndex: number,
): IFullActiveGame {
  const players = clonePlayers(state);
  players[playerIndex].planetIntegrity += 1;
  state.turn += 1; // play again
  return { ...state, players };
}

/* pe_004 */
export function amethystSpire(
  state: IFullActiveGame,
  playerIndex: number,
): IFullActiveGame {
  const players = clonePlayers(state);
  players[playerIndex].planetIntegrity += 3;
  endTurn(state);
  return { ...state, players };
}

/* pe_005 */
export function smokyQuartz(
  state: IFullActiveGame,
  playerIndex: number,
): IFullActiveGame {
  const players = clonePlayers(state);
  const enemy = playerIndex === 0 ? 1 : 0;
  players[enemy].planetIntegrity = Math.max(
    0,
    players[enemy].planetIntegrity - 1,
  );
  state.turn += 1; // play again
  return { ...state, players };
}

/* pe_006 */
export function cosmicRift(
  state: IFullActiveGame,
  playerIndex: number,
): IFullActiveGame {
  const players = clonePlayers(state);
  const enemy = playerIndex === 0 ? 1 : 0;
  players[enemy].planetIntegrity = Math.max(
    0,
    players[enemy].planetIntegrity - 3,
  );
  endTurn(state);
  return { ...state, players };
}

/* pe_007 */
export function forceBurst(
  state: IFullActiveGame,
  playerIndex: number,
): IFullActiveGame {
  const players = clonePlayers(state);
  players[playerIndex].planetIntegrity -= 5;
  players[playerIndex].resources.drones += 2;
  endTurn(state);
  return { ...state, players };
}

/* pe_008 */
export function rubyNova(
  state: IFullActiveGame,
  playerIndex: number,
): IFullActiveGame {
  const players = clonePlayers(state);
  players[playerIndex].planetIntegrity += 5;
  endTurn(state);
  return { ...state, players };
}

/* pe_009 */
export function psiWeaver(
  state: IFullActiveGame,
  playerIndex: number,
): IFullActiveGame {
  const players = clonePlayers(state);
  players[playerIndex].resources.drones += 1;
  endTurn(state);
  return { ...state, players };
}

/* pe_010 */
export function eclipseRay(
  state: IFullActiveGame,
  playerIndex: number,
): IFullActiveGame {
  const players = clonePlayers(state);
  const enemy = playerIndex === 0 ? 1 : 0;
  players[playerIndex].planetIntegrity += 2;
  players[enemy].planetIntegrity = Math.max(
    0,
    players[enemy].planetIntegrity - 2,
  );
  endTurn(state);
  return { ...state, players };
}

/* pe_011 */
export function stellarSpear(
  state: IFullActiveGame,
  playerIndex: number,
): IFullActiveGame {
  const players = clonePlayers(state);
  const enemy = playerIndex === 0 ? 1 : 0;
  players[enemy].planetIntegrity = Math.max(
    0,
    players[enemy].planetIntegrity - 5,
  );
  endTurn(state);
  return { ...state, players };
}

/* pe_012 */
export function cosmicAid(
  state: IFullActiveGame,
  playerIndex: number,
): IFullActiveGame {
  const players = clonePlayers(state);
  players[playerIndex].planetIntegrity += 7;
  players[playerIndex].resources.nanomaterials = Math.max(
    0,
    players[playerIndex].resources.nanomaterials - 10,
  );
  endTurn(state);
  return { ...state, players };
}

/* pe_013 */
export function initiationSequence(
  state: IFullActiveGame,
  playerIndex: number,
): IFullActiveGame {
  const players = clonePlayers(state);
  const enemy = playerIndex === 0 ? 1 : 0;
  players[playerIndex].planetIntegrity += 4;
  players[playerIndex].resources.drones = Math.max(
    0,
    players[playerIndex].resources.drones - 3,
  );
  players[enemy].planetIntegrity = Math.max(
    0,
    players[enemy].planetIntegrity - 2,
  );
  endTurn(state);
  return { ...state, players };
}

/* pe_014 */
export function cosmicDiscord(
  state: IFullActiveGame,
  _: number,
): IFullActiveGame {
  const players = clonePlayers(state);
  players.forEach(
    (p) => (p.planetIntegrity = Math.max(0, p.planetIntegrity - 7)),
  );
  players.forEach(
    (p) => (p.resources.drones = Math.max(0, p.resources.drones - 1)),
  );
  endTurn(state);
  return { ...state, players };
}

/* pe_015 */
export function oreVein(
  state: IFullActiveGame,
  playerIndex: number,
): IFullActiveGame {
  const players = clonePlayers(state);
  players[playerIndex].planetIntegrity += 8;
  endTurn(state);
  return { ...state, players };
}

/* pe_016 */
export function matrixPulse(
  state: IFullActiveGame,
  playerIndex: number,
): IFullActiveGame {
  const players = clonePlayers(state);
  const enemy = playerIndex === 0 ? 1 : 0;
  players[playerIndex].resources.drones += 1;
  players[playerIndex].planetIntegrity += 3;
  players[enemy].planetIntegrity += 1;
  endTurn(state);
  return { ...state, players };
}

/* pe_017 */
export function emeraldBeam(
  state: IFullActiveGame,
  playerIndex: number,
): IFullActiveGame {
  const players = clonePlayers(state);
  players[playerIndex].planetIntegrity += 8;
  endTurn(state);
  return { ...state, players };
}

/* pe_018 */
export function harmonyArray(
  state: IFullActiveGame,
  playerIndex: number,
): IFullActiveGame {
  const players = clonePlayers(state);
  players[playerIndex].resources.drones += 1;
  players[playerIndex].planetIntegrity += 3;
  players[playerIndex].resources.nanomaterials += 3;
  endTurn(state);
  return { ...state, players };
}

/* pe_019 */
export function softStone(
  state: IFullActiveGame,
  playerIndex: number,
): IFullActiveGame {
  const players = clonePlayers(state);
  const enemy = playerIndex === 0 ? 1 : 0;
  players[playerIndex].planetIntegrity += 5;
  players[enemy].resources.nanomaterials = Math.max(
    0,
    players[enemy].resources.nanomaterials - 6,
  );
  endTurn(state);
  return { ...state, players };
}

/* pe_020 */
export function parityCore(state: IFullActiveGame, _: number): IFullActiveGame {
  const players = clonePlayers(state);
  const maxDrones = Math.max(
    players[0].resources.drones,
    players[1].resources.drones,
  );
  players.forEach((p) => (p.resources.drones = maxDrones));
  endTurn(state);
  return { ...state, players };
}

/* pe_021 */
export function fragmentationPulse(
  state: IFullActiveGame,
  playerIndex: number,
): IFullActiveGame {
  const players = clonePlayers(state);
  const enemy = playerIndex === 0 ? 1 : 0;
  players[playerIndex].resources.drones = Math.max(
    0,
    players[playerIndex].resources.drones - 1,
  );
  players[enemy].planetIntegrity = Math.max(
    0,
    players[enemy].planetIntegrity - 9,
  );
  endTurn(state);
  return { ...state, players };
}

/* pe_022 */
export function solidification(
  state: IFullActiveGame,
  playerIndex: number,
): IFullActiveGame {
  const players = clonePlayers(state);
  players[playerIndex].planetIntegrity += 11;
  const enemy = playerIndex === 0 ? 1 : 0;
  players[enemy].resources.nanomaterials = Math.max(
    0,
    players[enemy].resources.nanomaterials - 6,
  );
  endTurn(state);
  return { ...state, players };
}

/* pe_023 */
export function pearlWisdom(
  state: IFullActiveGame,
  playerIndex: number,
): IFullActiveGame {
  const players = clonePlayers(state);
  players[playerIndex].planetIntegrity += 5;
  players[playerIndex].resources.drones += 1;
  endTurn(state);
  return { ...state, players };
}

/* pe_024 */
export function sapphireBeacon(
  state: IFullActiveGame,
  playerIndex: number,
): IFullActiveGame {
  const players = clonePlayers(state);
  players[playerIndex].planetIntegrity += 11;
  endTurn(state);
  return { ...state, players };
}

/* pe_025 */
export function lightningSurge(
  state: IFullActiveGame,
  playerIndex: number,
): IFullActiveGame {
  const players = clonePlayers(state);
  const enemy = playerIndex === 0 ? 1 : 0;
  if (players[playerIndex].planetIntegrity > players[enemy].planetIntegrity) {
    players[enemy].planetIntegrity = Math.max(
      0,
      players[enemy].planetIntegrity - 8,
    );
  } else {
    players.forEach(
      (p) => (p.planetIntegrity = Math.max(0, p.planetIntegrity - 8)),
    );
  }
  endTurn(state);
  return { ...state, players };
}

/* pe_026 */
export function crystalShield(
  state: IFullActiveGame,
  playerIndex: number,
): IFullActiveGame {
  const players = clonePlayers(state);
  players[playerIndex].planetIntegrity += 8;
  players[playerIndex].resources.nanomaterials += 3;
  endTurn(state);
  return { ...state, players };
}

/* pe_027 */
export function rubyFlare(
  state: IFullActiveGame,
  playerIndex: number,
): IFullActiveGame {
  const players = clonePlayers(state);
  const enemy = playerIndex === 0 ? 1 : 0;
  players[playerIndex].planetIntegrity += 6;
  players[enemy].planetIntegrity = Math.max(
    0,
    players[enemy].planetIntegrity - 4,
  );
  endTurn(state);
  return { ...state, players };
}

/* pe_028 */
export function empathyCore(
  state: IFullActiveGame,
  playerIndex: number,
): IFullActiveGame {
  const players = clonePlayers(state);
  players[playerIndex].planetIntegrity += 8;
  players[playerIndex].resources.drones += 1;
  endTurn(state);
  return { ...state, players };
}

/* pe_029 */
export function orbitalReactor(
  state: IFullActiveGame,
  playerIndex: number,
): IFullActiveGame {
  const players = clonePlayers(state);
  players[playerIndex].planetIntegrity += 10;
  players[playerIndex].resources.nanomaterials += 5;
  players[playerIndex].resources.drones += 5;
  endTurn(state);
  return { ...state, players };
}

/* pe_030 */
export function diamondCore(
  state: IFullActiveGame,
  playerIndex: number,
): IFullActiveGame {
  const players = clonePlayers(state);
  players[playerIndex].planetIntegrity += 15;
  endTurn(state);
  return { ...state, players };
}

/* pe_031 */
export function luminousStone(
  state: IFullActiveGame,
  playerIndex: number,
): IFullActiveGame {
  const players = clonePlayers(state);
  players[playerIndex].planetIntegrity += 12;
  const enemy = playerIndex === 0 ? 1 : 0;
  players[enemy].planetIntegrity = Math.max(
    0,
    players[enemy].planetIntegrity - 6,
  );
  endTurn(state);
  return { ...state, players };
}

/* pe_032 */
export function meditationCore(
  state: IFullActiveGame,
  playerIndex: number,
): IFullActiveGame {
  const players = clonePlayers(state);
  players[playerIndex].planetIntegrity += 13;
  players[playerIndex].resources.drones += 6;
  players[playerIndex].resources.nanomaterials += 6;
  endTurn(state);
  return { ...state, players };
}

/* pe_033 */
export function dragonEye(
  state: IFullActiveGame,
  playerIndex: number,
): IFullActiveGame {
  const players = clonePlayers(state);
  players[playerIndex].planetIntegrity += 20;
  endTurn(state);
  return { ...state, players };
}
