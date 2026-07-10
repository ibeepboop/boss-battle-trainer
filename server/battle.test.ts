import { describe, it, expect } from 'vitest';
import { calculateDamage, calculateXpAward, checkLevelUp, damageBoss, rollLoot } from './src/services/battle';
import type { Player, Boss, Activity } from '@boss-battle-trainer/shared';

const player: Player = {
    id: 1,
    name: 'test',
    level: 1,
    xp: 0,
    xpToNextLevel: 100,
    str: 10,
    sta: 10,
    unspentStatPoints: 0
};

const activity: Activity = {
    id: 1,
    type: 'hike',
    distanceMi: 5,
    elevationGainFt: 1000,
    durationMin: 90,
    date: '2026-01-01' 
};

const boss: Boss = {
    id: 1,
    name: 'Test Boss',
    order: 1,
    maxHp: 100,
    currentHp: 100,
    defeated: false,
    flavorText: ''
};

describe('calculateDamage', () => {
    it('calculates non-crit damage correctly', () => {
        const result = calculateDamage(activity, player, () => 0.5);
        expect(result).toEqual({ 
            damage: 248, 
            wasCrit: false 
        });
    })
    
    it('applies the crit multiplier when the roll is below the crit chance', () => {
        const result = calculateDamage(activity, player, () => 0.05);
        expect(result).toEqual({
            damage: 433,
            wasCrit: true
        });
    });
});

describe('calculateXpAward', () => {
    it('awards XP equal to damage dealt', () => {
        expect(calculateXpAward(248)).toBe(248);
    });
});

describe('checkLevelUp', () => {
    it('does not level up if XP is below the threshold', () => {
        const result = checkLevelUp({
            ...player,
            xp: 0,
            xpToNextLevel: 100
        }, 50);
        expect(result).toEqual({
            level: 1,
            xp: 50,
            xpToNextLevel: 100,
            unspentStatPoints: 0,
            leveledUp: false
        });
    });

    it('levels up once when XP crosses the threshold', () => {
        const result = checkLevelUp({
            ...player,
            xp: 80,
            xpToNextLevel: 100,
            unspentStatPoints: 0
        }, 30);
        expect(result).toEqual({
            level: 2,
            xp: 10,
            xpToNextLevel: 200,
            unspentStatPoints: 2,
            leveledUp: true
        });
    });
});

describe('damageBoss', () => {
    it('reduces currentHp without defeating the boss', () => {
        expect(damageBoss({
            ...boss,
            currentHp: 100
        }, 30)).toEqual({
            currentHp:70,
            defeated: false
        });
    });

    it('defeats the boss at exactly 0 HP', () => {
        expect(damageBoss({
            ...boss,
            currentHp: 50
            }, 50)).toEqual({
            currentHp: 0,
            defeated: true
            });
    });

    it('floors HP at 0 on overkill damage, rather than going negative', () => {
        expect(damageBoss({
            ...boss,
            currentHp: 50
        }, 80)).toEqual({
            currentHp: 0,
            defeated: true
        });
    });
});

describe('rollLoot', () => {
    it('returns null when the drop roll fails', () => {
        expect(rollLoot(() => 0.6)).toBeNull();
    });

    it('returns an item when the drop roll succeeds', () => {
        let callCount = 0;
        const sequence = [0.1, 0.1];
        const random = () => sequence[callCount++];
        expect(rollLoot(random)).toEqual({
            id: 1,
            name: "Trail Runner's Compression Socks",
            strBonus: 0,
            staBonus: 3
        });
    });
});



