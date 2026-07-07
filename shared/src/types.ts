export interface Player {
  id: number;
  name: string;
  level: number;
  xp: number;
  xpToNextLevel: number;
  str: number;
  sta: number;
  unspentStatPoints: number;
}

export interface Boss {
  id: number;
  name: string;
  order: number;
  maxHp: number;
  currentHp: number;
  defeated: boolean;
  flavorText: string;
}

export interface Activity {
  id: number;
  type: 'run' | 'hike' | 'walk';
  distanceMi: number;
  elevationGainFt: number;
  durationMin: number;
  date: string;
}

export interface BattleResult {
  damageDealt: number;
  wasCrit: boolean;
  xpAwarded: number;
  leveledUp: boolean;
  bossDefeated: boolean;
  lootDropped: LootItem | null;
}

export interface LootItem {
  id: number;
  name: string;
  strBonus: number;
  staBonus: number;
}