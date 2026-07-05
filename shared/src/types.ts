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
