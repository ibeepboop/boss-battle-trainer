import type { Player, Boss, Activity, LootItem } from '@boss-battle-trainer/shared';

const ENDURANCE_COEFFICIENT = 15;
const POWER_COEFFICIENT = 0.15;
const CRIT_CHANCE = 0.15;
const CRIT_MULTIPLIER = 1.75;

export function calculateDamage(
    activity: Activity,
    player: Player,
    random: () => number = Math.random
): { damage: number; wasCrit: boolean } {
    const enduranceDamage = activity.distanceMi * ENDURANCE_COEFFICIENT * ( 1 + player.sta / 100 );
    const powerDamage = activity.elevationGainFt * POWER_COEFFICIENT * ( 1 + player.str / 100 );
    const baseDamage = enduranceDamage + powerDamage;

    const wasCrit = random() < CRIT_CHANCE;
    const damage = wasCrit ? baseDamage * CRIT_MULTIPLIER : baseDamage;

    return { damage: Math.round(damage), wasCrit };
}

export function calculateXpAward(damage: number): number {
    return damage;
}

export function checkLevelUp(
    player: Player,
    xpGained: number
): { level: number; xp: number; xpToNextLevel: number; unspentStatPoints: number; leveledUp: boolean } {
    let level = player.level;
    let xp = player.xp + xpGained;
    let xpToNextLevel = player.xpToNextLevel;
    let unspentStatPoints = player.unspentStatPoints;
    let leveledUp = false;

    while (xp >= xpToNextLevel) {
        xp -= xpToNextLevel;
        level += 1;
        unspentStatPoints += 2;
        xpToNextLevel = level * 100;
        leveledUp = true;
    }

    return { level, xp, xpToNextLevel, unspentStatPoints, leveledUp };
}

export function damageBoss(boss: Boss, damage: number): { currentHp: number; defeated: boolean } {
    const currentHp = Math.max(0, boss.currentHp - damage);
    return { currentHp, defeated: currentHp === 0};
}

const LOOT_DROP_CHANCE = 0.5;

const LOOT_TABLE: LootItem[] = [
    { id: 1, name: "Trail Runner's Compression Socks", strBonus: 0, staBonus: 3 },
    { id: 2, name: 'Ergonomic Trekking Poles', strBonus: 3, staBonus: 0 },
    { id: 3, name: 'Blister-Proof Wool Socks', strBonus: 0, staBonus: 2 },
    { id: 4, name: 'Ultralight Rain Shell', strBonus: 2, staBonus: 0 },
];

export function rollLoot(random: () => number = Math.random): LootItem | null {
   if (random() >= LOOT_DROP_CHANCE) {
    return null;
   }
   const index = Math.floor(random() * LOOT_TABLE.length);
   return LOOT_TABLE[index];
}

