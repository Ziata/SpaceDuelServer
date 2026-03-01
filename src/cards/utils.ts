import { IFullActiveGame, IPlayerGameState } from 'src/games/types/game.types';
import { DamageType } from './types/cards.types';

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

export function dealDamage(
  players: IPlayerGameState[],
  targetIndex: 0 | 1,
  damage: number,
  damageType: DamageType = DamageType.NORMAL,
) {
  const target = players[targetIndex];

  // Урон ТОЛЬКО по планете (игнор щита)
  if (damageType === DamageType.PLANET_ONLY) {
    target.planetIntegrity = Math.max(0, target.planetIntegrity - damage);
    return;
  }

  // Урон по щиту
  const shieldDamage = Math.min(target.orbitalShield, damage);
  target.orbitalShield = Math.max(0, target.orbitalShield - damage);

  // Если урон только по щиту — дальше не идём
  if (damageType === DamageType.SHIELD_ONLY) {
    return;
  }

  // Обычный урон: остаток идёт в планету
  const remainingDamage = damage - shieldDamage;
  if (remainingDamage > 0) {
    target.planetIntegrity = Math.max(
      0,
      target.planetIntegrity - remainingDamage,
    );
  }
}
