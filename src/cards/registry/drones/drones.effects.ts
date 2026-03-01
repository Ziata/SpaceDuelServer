import { DamageType } from 'src/cards/types/cards.types';
import { clonePlayers, dealDamage, endTurn } from 'src/cards/utils';
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
  playerIndex: 1 | 0,
): IFullActiveGame {
  const players = clonePlayers(state);
  players.forEach((p) => (p.production.drones += 1));
  players[playerIndex].resources.drones += 3;
  endTurn(state);
  return { ...state, players };
}

/* dr_003 */
export function microDrone(
  state: IFullActiveGame,
  playerIndex: 1 | 0,
): IFullActiveGame {
  const players = clonePlayers(state);
  const enemyIndex = playerIndex === 0 ? 1 : 0;
  dealDamage(players, enemyIndex, 4);
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
  playerIndex: 1 | 0,
): IFullActiveGame {
  const players = clonePlayers(state);
  const enemyIndex = playerIndex === 0 ? 1 : 0;
  dealDamage(players, enemyIndex, 2);
  state.turn += 1; // играем снова
  return { ...state, players };
}

/* dr_005 */
export function ionLance(
  state: IFullActiveGame,
  playerIndex: 1 | 0,
): IFullActiveGame {
  const players = clonePlayers(state);
  const enemyIndex = playerIndex === 0 ? 1 : 0;
  dealDamage(players, enemyIndex, 3);
  players[playerIndex].resources.psiEnergy += 1;
  endTurn(state);
  return { ...state, players };
}

/* dr_006 */
export function swarmStrike(
  state: IFullActiveGame,
  playerIndex: 1 | 0,
): IFullActiveGame {
  const players = clonePlayers(state);
  const enemyIndex = playerIndex === 0 ? 1 : 0;
  dealDamage(
    players,
    enemyIndex,
    players[playerIndex].orbitalShield > players[enemyIndex].orbitalShield
      ? 3
      : 2,
  );
  endTurn(state);
  return { ...state, players };
}

/* dr_007 */
export function droneReinforce(
  state: IFullActiveGame,
  playerIndex: 1 | 0,
): IFullActiveGame {
  const players = clonePlayers(state);
  players[playerIndex].production.drones += 1;
  endTurn(state);
  return { ...state, players };
}

/* dr_008 */
export function orbitalStrike(
  state: IFullActiveGame,
  playerIndex: 1 | 0,
): IFullActiveGame {
  const players = clonePlayers(state);
  const enemyIndex = playerIndex === 0 ? 1 : 0;
  dealDamage(players, enemyIndex, 6);
  endTurn(state);
  return { ...state, players };
}

/* dr_009 */
export function berserkModule(
  state: IFullActiveGame,
  playerIndex: 1 | 0,
): IFullActiveGame {
  const players = clonePlayers(state);
  const enemyIndex = playerIndex === 0 ? 1 : 0;
  dealDamage(players, enemyIndex, 8);
  dealDamage(players, playerIndex, 3);
  endTurn(state);
  return { ...state, players };
}

/* dr_010 */
export function sniperDrone(
  state: IFullActiveGame,
  playerIndex: 1 | 0,
): IFullActiveGame {
  const players = clonePlayers(state);
  const enemyIndex = playerIndex === 0 ? 1 : 0;
  dealDamage(players, enemyIndex, 3);
  dealDamage(players, playerIndex, 1);
  endTurn(state);
  return { ...state, players };
}

/* dr_011 */
export function nebulaLauncher(
  state: IFullActiveGame,
  playerIndex: 1 | 0,
): IFullActiveGame {
  const players = clonePlayers(state);
  const enemyIndex = playerIndex === 0 ? 1 : 0;
  dealDamage(players, enemyIndex, 4);
  players[playerIndex].orbitalShield += 3;
  endTurn(state);
  return { ...state, players };
}

/* dr_012 */
export function demolisher(
  state: IFullActiveGame,
  playerIndex: 1 | 0,
): IFullActiveGame {
  const players = clonePlayers(state);
  const enemyIndex = playerIndex === 0 ? 1 : 0;
  dealDamage(players, enemyIndex, 6);
  endTurn(state);
  return { ...state, players };
}

/* dr_013 */
export function voidPulse(
  state: IFullActiveGame,
  playerIndex: 1 | 0,
): IFullActiveGame {
  const players = clonePlayers(state);
  const enemyIndex = playerIndex === 0 ? 1 : 0;
  dealDamage(players, enemyIndex, 6);
  dealDamage(players, playerIndex, 6);
  players.forEach((p) => {
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
  playerIndex: 1 | 0,
): IFullActiveGame {
  const players = clonePlayers(state);
  const enemyIndex = playerIndex === 0 ? 1 : 0;
  dealDamage(players, enemyIndex, 6);
  players[enemyIndex].resources.drones = Math.max(
    0,
    players[enemyIndex].resources.drones - 3,
  );
  endTurn(state);
  return { ...state, players };
}

/* dr_015 */
export function microSerpents(
  state: IFullActiveGame,
  playerIndex: 1 | 0,
): IFullActiveGame {
  const players = clonePlayers(state);
  const enemyIndex = playerIndex === 0 ? 1 : 0;
  dealDamage(players, enemyIndex, 4, DamageType.PLANET_ONLY);
  endTurn(state);
  return { ...state, players };
}

/* dr_016 */
export function titanCannon(
  state: IFullActiveGame,
  playerIndex: 1 | 0,
): IFullActiveGame {
  const players = clonePlayers(state);
  const enemyIndex = playerIndex === 0 ? 1 : 0;
  dealDamage(players, enemyIndex, 7);
  endTurn(state);
  return { ...state, players };
}

/* dr_017 */
export function phantomEmitter(
  state: IFullActiveGame,
  playerIndex: 1 | 0,
): IFullActiveGame {
  const players = clonePlayers(state);
  const enemyIndex = playerIndex === 0 ? 1 : 0;
  dealDamage(players, enemyIndex, 2);
  state.turn += 1; // играем снова
  return { ...state, players };
}

/* dr_018 */
export function tutorDrone(
  state: IFullActiveGame,
  playerIndex: 1 | 0,
): IFullActiveGame {
  const players = clonePlayers(state);
  players[playerIndex].production.drones += 2;
  endTurn(state);
  return { ...state, players };
}

/* dr_019 */
export function voidTurret(
  state: IFullActiveGame,
  playerIndex: 1 | 0,
): IFullActiveGame {
  const players = clonePlayers(state);
  const enemyIndex = playerIndex === 0 ? 1 : 0;
  dealDamage(players, enemyIndex, 2);
  players[playerIndex].orbitalShield += 4;
  players[playerIndex].resources.drones += 2;
  endTurn(state);
  return { ...state, players };
}

/* dr_020 */
export function breakerBeam(
  state: IFullActiveGame,
  playerIndex: 1 | 0,
): IFullActiveGame {
  const players = clonePlayers(state);
  const enemyIndex = playerIndex === 0 ? 1 : 0;
  const damage = players[enemyIndex].orbitalShield === 0 ? 10 : 6;
  dealDamage(players, enemyIndex, damage);
  endTurn(state);
  return { ...state, players };
}

/* dr_021 */
export function singularityRay(
  state: IFullActiveGame,
  playerIndex: 1 | 0,
): IFullActiveGame {
  const players = clonePlayers(state);
  const enemyIndex = playerIndex === 0 ? 1 : 0;
  const damage =
    players[playerIndex].resources.drones > players[enemyIndex].resources.drones
      ? 12
      : 8;
  dealDamage(players, enemyIndex, damage);
  endTurn(state);
  return { ...state, players };
}

/* dr_022 */
export function wolfStrike(
  state: IFullActiveGame,
  playerIndex: 1 | 0,
): IFullActiveGame {
  const players = clonePlayers(state);
  const enemyIndex = playerIndex === 0 ? 1 : 0;
  dealDamage(players, enemyIndex, 9);
  endTurn(state);
  return { ...state, players };
}

/* dr_023 */
export function sharpshotDrone(
  state: IFullActiveGame,
  playerIndex: 1 | 0,
): IFullActiveGame {
  const players = clonePlayers(state);
  const enemyIndex = playerIndex === 0 ? 1 : 0;
  dealDamage(
    players,
    enemyIndex,
    6,
    players[playerIndex].orbitalShield > players[enemyIndex].orbitalShield
      ? DamageType.PLANET_ONLY
      : DamageType.NORMAL,
  );
  endTurn(state);
  return { ...state, players };
}

/* dr_024 */
export function corrosiveCloud(
  state: IFullActiveGame,
  playerIndex: 1 | 0,
): IFullActiveGame {
  const players = clonePlayers(state);
  const enemyIndex = playerIndex === 0 ? 1 : 0;
  const damage = players[enemyIndex].orbitalShield > 10 ? 10 : 7;
  dealDamage(players, enemyIndex, damage);
  endTurn(state);
  return { ...state, players };
}

/* dr_025 */
export function rockDriller(
  state: IFullActiveGame,
  playerIndex: 1 | 0,
): IFullActiveGame {
  const players = clonePlayers(state);
  const enemyIndex = playerIndex === 0 ? 1 : 0;
  dealDamage(players, enemyIndex, 8);
  players[enemyIndex].production.nanomaterials = Math.max(
    0,
    players[enemyIndex].production.nanomaterials - 1,
  );
  endTurn(state);
  return { ...state, players };
}

/* dr_026 */
export function scavenger(
  state: IFullActiveGame,
  playerIndex: 1 | 0,
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
  playerIndex: 1 | 0,
): IFullActiveGame {
  const players = clonePlayers(state);
  const enemyIndex = playerIndex === 0 ? 1 : 0;
  dealDamage(players, enemyIndex, 13);
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
  playerIndex: 1 | 0,
): IFullActiveGame {
  const players = clonePlayers(state);
  const enemyIndex = playerIndex === 0 ? 1 : 0;
  dealDamage(players, enemyIndex, 5, DamageType.PLANET_ONLY);
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
  playerIndex: 1 | 0,
): IFullActiveGame {
  const players = clonePlayers(state);
  const enemyIndex = playerIndex === 0 ? 1 : 0;
  dealDamage(players, enemyIndex, 10);
  players[playerIndex].planetIntegrity += 4;
  endTurn(state);
  return { ...state, players };
}

/* dr_030 */
export function darkVanguard(
  state: IFullActiveGame,
  playerIndex: 1 | 0,
): IFullActiveGame {
  const players = clonePlayers(state);
  const enemyIndex = playerIndex === 0 ? 1 : 0;
  dealDamage(players, enemyIndex, 10);
  players[enemyIndex].production.drones = Math.max(
    0,
    players[enemyIndex].production.drones - 1,
  );
  endTurn(state);
  return { ...state, players };
}

/* dr_031 */
export function pegasusLancer(
  state: IFullActiveGame,
  playerIndex: 1 | 0,
): IFullActiveGame {
  const players = clonePlayers(state);
  const enemyIndex = playerIndex === 0 ? 1 : 0;
  dealDamage(players, enemyIndex, 12, DamageType.PLANET_ONLY);
  endTurn(state);
  return { ...state, players };
}

/* dr_032 */
export function novaDragon(
  state: IFullActiveGame,
  playerIndex: 1 | 0,
): IFullActiveGame {
  const players = clonePlayers(state);
  const enemyIndex = playerIndex === 0 ? 1 : 0;
  dealDamage(players, enemyIndex, 20);
  players[enemyIndex].resources.psiEnergy = Math.max(
    0,
    players[enemyIndex].resources.psiEnergy - 10,
  );
  players[enemyIndex].production.drones = Math.max(
    0,
    players[enemyIndex].production.drones - 1,
  );
  endTurn(state);
  return { ...state, players };
}
