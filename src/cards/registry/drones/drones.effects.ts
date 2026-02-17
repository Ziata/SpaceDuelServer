import { clonePlayers, endTurn } from 'src/cards/utils';
import { IFullActiveGame } from 'src/games/types/game.types';

// =====================
// Эффекты карт дронов
// =====================

/* dr_001 */
export function rogueSignal(
  state: IFullActiveGame,
  _: number,
): IFullActiveGame {
  const players = clonePlayers(state);
  players.forEach(
    (p) => (p.resources.drones = Math.max(0, p.resources.drones - 6)),
  );
  endTurn(state);
  return { ...state, players };
}

/* dr_002 */
export function lunarPulse(
  state: IFullActiveGame,
  playerIndex: number,
): IFullActiveGame {
  const players = clonePlayers(state);
  players.forEach((p) => (p.resources.drones += 1));
  players[playerIndex].resources.drones += 3;
  endTurn(state);
  return { ...state, players };
}

/* dr_003 */
export function microDrone(
  state: IFullActiveGame,
  playerIndex: number,
): IFullActiveGame {
  const players = clonePlayers(state);
  const enemyIndex = playerIndex === 0 ? 1 : 0;
  players[enemyIndex].planetIntegrity = Math.max(
    0,
    players[enemyIndex].planetIntegrity - 4,
  );
  players[playerIndex].resources.psiEnergy = Math.max(
    0,
    players[playerIndex].resources.psiEnergy - 3,
  );
  endTurn(state);
  return { ...state, players };
}

/* dr_004 */
export function echoPulse(
  state: IFullActiveGame,
  playerIndex: number,
): IFullActiveGame {
  const players = clonePlayers(state);
  const enemyIndex = playerIndex === 0 ? 1 : 0;
  players[enemyIndex].planetIntegrity = Math.max(
    0,
    players[enemyIndex].planetIntegrity - 2,
  );
  state.turn += 1; // играем снова
  return { ...state, players };
}

/* dr_005 */
export function ionLance(
  state: IFullActiveGame,
  playerIndex: number,
): IFullActiveGame {
  const players = clonePlayers(state);
  const enemyIndex = playerIndex === 0 ? 1 : 0;
  players[enemyIndex].planetIntegrity = Math.max(
    0,
    players[enemyIndex].planetIntegrity - 3,
  );
  players[playerIndex].resources.psiEnergy += 1;
  endTurn(state);
  return { ...state, players };
}

/* dr_006 */
export function swarmStrike(
  state: IFullActiveGame,
  playerIndex: number,
): IFullActiveGame {
  const players = clonePlayers(state);
  const enemyIndex = playerIndex === 0 ? 1 : 0;
  const damage =
    players[playerIndex].orbitalShield > players[enemyIndex].orbitalShield
      ? 3
      : 2;
  players[enemyIndex].planetIntegrity = Math.max(
    0,
    players[enemyIndex].planetIntegrity - damage,
  );
  endTurn(state);
  return { ...state, players };
}

/* dr_007 */
export function droneReinforce(
  state: IFullActiveGame,
  playerIndex: number,
): IFullActiveGame {
  const players = clonePlayers(state);
  players[playerIndex].resources.drones += 1;
  endTurn(state);
  return { ...state, players };
}

/* dr_008 */
export function orbitalStrike(
  state: IFullActiveGame,
  playerIndex: number,
): IFullActiveGame {
  const players = clonePlayers(state);
  const enemyIndex = playerIndex === 0 ? 1 : 0;
  players[enemyIndex].planetIntegrity = Math.max(
    0,
    players[enemyIndex].planetIntegrity - 6,
  );
  endTurn(state);
  return { ...state, players };
}

/* dr_009 */
export function berserkModule(
  state: IFullActiveGame,
  playerIndex: number,
): IFullActiveGame {
  const players = clonePlayers(state);
  const enemyIndex = playerIndex === 0 ? 1 : 0;
  players[enemyIndex].planetIntegrity = Math.max(
    0,
    players[enemyIndex].planetIntegrity - 8,
  );
  players[playerIndex].planetIntegrity = Math.max(
    0,
    players[playerIndex].planetIntegrity - 3,
  );
  endTurn(state);
  return { ...state, players };
}

/* dr_010 */
export function sniperDrone(
  state: IFullActiveGame,
  playerIndex: number,
): IFullActiveGame {
  const players = clonePlayers(state);
  const enemyIndex = playerIndex === 0 ? 1 : 0;
  players[enemyIndex].planetIntegrity = Math.max(
    0,
    players[enemyIndex].planetIntegrity - 3,
  );
  players[playerIndex].planetIntegrity = Math.max(
    0,
    players[playerIndex].planetIntegrity - 1,
  );
  endTurn(state);
  return { ...state, players };
}

/* dr_011 */
export function dwarfLauncher(
  state: IFullActiveGame,
  playerIndex: number,
): IFullActiveGame {
  const players = clonePlayers(state);
  const enemyIndex = playerIndex === 0 ? 1 : 0;
  players[enemyIndex].planetIntegrity = Math.max(
    0,
    players[enemyIndex].planetIntegrity - 4,
  );
  players[playerIndex].orbitalShield += 3;
  endTurn(state);
  return { ...state, players };
}

/* dr_012 */
export function demolisher(
  state: IFullActiveGame,
  playerIndex: number,
): IFullActiveGame {
  const players = clonePlayers(state);
  const enemyIndex = playerIndex === 0 ? 1 : 0;
  players[enemyIndex].planetIntegrity = Math.max(
    0,
    players[enemyIndex].planetIntegrity - 6,
  );
  endTurn(state);
  return { ...state, players };
}

/* dr_013 */
export function voidPulse(state: IFullActiveGame, _: number): IFullActiveGame {
  const players = clonePlayers(state);
  players.forEach((p) => {
    p.planetIntegrity = Math.max(0, p.planetIntegrity - 6);
    p.resources.nanomaterials = Math.max(0, p.resources.nanomaterials - 5);
    p.resources.psiEnergy = Math.max(0, p.resources.psiEnergy - 5);
    p.resources.drones = Math.max(0, p.resources.drones - 6);
  });
  endTurn(state);
  return { ...state, players };
}

/* dr_014 */
export function rampageDrone(
  state: IFullActiveGame,
  playerIndex: number,
): IFullActiveGame {
  const players = clonePlayers(state);
  const enemyIndex = playerIndex === 0 ? 1 : 0;
  players[enemyIndex].planetIntegrity = Math.max(
    0,
    players[enemyIndex].planetIntegrity - 6,
  );
  players[playerIndex].resources.drones += 3;
  endTurn(state);
  return { ...state, players };
}

/* dr_015 */
export function microSerpents(
  state: IFullActiveGame,
  playerIndex: number,
): IFullActiveGame {
  const players = clonePlayers(state);
  const enemyIndex = playerIndex === 0 ? 1 : 0;
  players[enemyIndex].planetIntegrity = Math.max(
    0,
    players[enemyIndex].planetIntegrity - 4,
  );
  endTurn(state);
  return { ...state, players };
}

/* dr_016 */
export function titanCannon(
  state: IFullActiveGame,
  playerIndex: number,
): IFullActiveGame {
  const players = clonePlayers(state);
  const enemyIndex = playerIndex === 0 ? 1 : 0;
  players[enemyIndex].planetIntegrity = Math.max(
    0,
    players[enemyIndex].planetIntegrity - 7,
  );
  endTurn(state);
  return { ...state, players };
}

/* dr_017 */
export function phantomEmitter(
  state: IFullActiveGame,
  playerIndex: number,
): IFullActiveGame {
  const players = clonePlayers(state);
  const enemyIndex = playerIndex === 0 ? 1 : 0;
  players[enemyIndex].planetIntegrity = Math.max(
    0,
    players[enemyIndex].planetIntegrity - 2,
  );
  state.turn += 1; // играем снова
  return { ...state, players };
}

/* dr_018 */
export function tutorDrone(
  state: IFullActiveGame,
  playerIndex: number,
): IFullActiveGame {
  const players = clonePlayers(state);
  players[playerIndex].resources.drones += 2;
  endTurn(state);
  return { ...state, players };
}

/* dr_019 */
export function gremlinTurret(
  state: IFullActiveGame,
  playerIndex: number,
): IFullActiveGame {
  const players = clonePlayers(state);
  players[playerIndex].planetIntegrity = Math.max(
    0,
    players[playerIndex].planetIntegrity - 2,
  );
  players[playerIndex].orbitalShield += 4;
  players[playerIndex].resources.drones += 2;
  endTurn(state);
  return { ...state, players };
}

/* dr_020 */
export function breakerBeam(
  state: IFullActiveGame,
  playerIndex: number,
): IFullActiveGame {
  const players = clonePlayers(state);
  const enemyIndex = playerIndex === 0 ? 1 : 0;
  const damage = players[enemyIndex].orbitalShield === 0 ? 10 : 6;
  players[enemyIndex].planetIntegrity = Math.max(
    0,
    players[enemyIndex].planetIntegrity - damage,
  );
  endTurn(state);
  return { ...state, players };
}

/* dr_021 */
export function singularityRay(
  state: IFullActiveGame,
  playerIndex: number,
): IFullActiveGame {
  const players = clonePlayers(state);
  const enemyIndex = playerIndex === 0 ? 1 : 0;
  const damage =
    players[playerIndex].resources.drones > players[enemyIndex].resources.drones
      ? 12
      : 8;
  players[enemyIndex].planetIntegrity = Math.max(
    0,
    players[enemyIndex].planetIntegrity - damage,
  );
  endTurn(state);
  return { ...state, players };
}

/* dr_022 */
export function wolfStrike(
  state: IFullActiveGame,
  playerIndex: number,
): IFullActiveGame {
  const players = clonePlayers(state);
  const enemyIndex = playerIndex === 0 ? 1 : 0;
  players[enemyIndex].planetIntegrity = Math.max(
    0,
    players[enemyIndex].planetIntegrity - 9,
  );
  endTurn(state);
  return { ...state, players };
}

/* dr_023 */
export function sharpshotDrone(
  state: IFullActiveGame,
  playerIndex: number,
): IFullActiveGame {
  const players = clonePlayers(state);
  const enemyIndex = playerIndex === 0 ? 1 : 0;
  const damage =
    players[playerIndex].orbitalShield > players[enemyIndex].orbitalShield
      ? 6
      : 6;
  players[enemyIndex].planetIntegrity = Math.max(
    0,
    players[enemyIndex].planetIntegrity - damage,
  );
  endTurn(state);
  return { ...state, players };
}

/* dr_024 */
export function corrosiveCloud(
  state: IFullActiveGame,
  playerIndex: number,
): IFullActiveGame {
  const players = clonePlayers(state);
  const enemyIndex = playerIndex === 0 ? 1 : 0;
  const damage = players[enemyIndex].orbitalShield > 10 ? 10 : 7;
  players[enemyIndex].planetIntegrity = Math.max(
    0,
    players[enemyIndex].planetIntegrity - damage,
  );
  endTurn(state);
  return { ...state, players };
}

/* dr_025 */
export function rockDriller(
  state: IFullActiveGame,
  playerIndex: number,
): IFullActiveGame {
  const players = clonePlayers(state);
  const enemyIndex = playerIndex === 0 ? 1 : 0;
  players[enemyIndex].resources.nanomaterials = Math.max(
    0,
    players[enemyIndex].resources.nanomaterials - 1,
  );
  players[enemyIndex].planetIntegrity = Math.max(
    0,
    players[enemyIndex].planetIntegrity - 8,
  );
  endTurn(state);
  return { ...state, players };
}

/* dr_026 */
export function scavenger(
  state: IFullActiveGame,
  playerIndex: number,
): IFullActiveGame {
  const players = clonePlayers(state);
  const enemyIndex = playerIndex === 0 ? 1 : 0;
  const stolenEnergy = Math.floor(players[enemyIndex].resources.psiEnergy / 2);
  const stolenNano = Math.floor(
    players[enemyIndex].resources.nanomaterials / 2,
  );
  players[enemyIndex].resources.psiEnergy = Math.max(
    0,
    players[enemyIndex].resources.psiEnergy - 10,
  );
  players[enemyIndex].resources.nanomaterials = Math.max(
    0,
    players[enemyIndex].resources.nanomaterials - 5,
  );
  players[playerIndex].resources.psiEnergy += stolenEnergy;
  players[playerIndex].resources.nanomaterials += stolenNano;
  endTurn(state);
  return { ...state, players };
}

/* dr_027 */
export function assaultModule(
  state: IFullActiveGame,
  playerIndex: number,
): IFullActiveGame {
  const players = clonePlayers(state);
  const enemyIndex = playerIndex === 0 ? 1 : 0;
  players[enemyIndex].planetIntegrity = Math.max(
    0,
    players[enemyIndex].planetIntegrity - 13,
  );
  players[playerIndex].resources.psiEnergy = Math.max(
    0,
    players[playerIndex].resources.psiEnergy - 3,
  );
  endTurn(state);
  return { ...state, players };
}

/* dr_028 */
export function piercingDrone(
  state: IFullActiveGame,
  playerIndex: number,
): IFullActiveGame {
  const players = clonePlayers(state);
  const enemyIndex = playerIndex === 0 ? 1 : 0;
  players[enemyIndex].planetIntegrity = Math.max(
    0,
    players[enemyIndex].planetIntegrity - 5,
  );
  players[enemyIndex].resources.drones = Math.max(
    0,
    players[enemyIndex].resources.drones - 6,
  );
  endTurn(state);
  return { ...state, players };
}

/* dr_029 */
export function shockCrawler(
  state: IFullActiveGame,
  playerIndex: number,
): IFullActiveGame {
  const players = clonePlayers(state);
  players[playerIndex].planetIntegrity += 4;
  const enemyIndex = playerIndex === 0 ? 1 : 0;
  players[enemyIndex].planetIntegrity = Math.max(
    0,
    players[enemyIndex].planetIntegrity - 6,
  );
  endTurn(state);
  return { ...state, players };
}

/* dr_030 */
export function darkVanguard(
  state: IFullActiveGame,
  playerIndex: number,
): IFullActiveGame {
  const players = clonePlayers(state);
  const enemyIndex = playerIndex === 0 ? 1 : 0;
  players[enemyIndex].planetIntegrity = Math.max(
    0,
    players[enemyIndex].planetIntegrity - 10,
  );
  endTurn(state);
  return { ...state, players };
}

/* dr_031 */
export function pegasusLancer(
  state: IFullActiveGame,
  playerIndex: number,
): IFullActiveGame {
  const players = clonePlayers(state);
  const enemyIndex = playerIndex === 0 ? 1 : 0;
  players[enemyIndex].planetIntegrity = Math.max(
    0,
    players[enemyIndex].planetIntegrity - 12,
  );
  endTurn(state);
  return { ...state, players };
}

/* dr_032 */
export function novaDragon(
  state: IFullActiveGame,
  playerIndex: number,
): IFullActiveGame {
  const players = clonePlayers(state);
  const enemyIndex = playerIndex === 0 ? 1 : 0;
  players[enemyIndex].planetIntegrity = Math.max(
    0,
    players[enemyIndex].planetIntegrity - 20,
  );
  players[enemyIndex].resources.psiEnergy = Math.max(
    0,
    players[enemyIndex].resources.psiEnergy - 10,
  );
  endTurn(state);
  return { ...state, players };
}
