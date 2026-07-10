import { Router } from 'express';
import db from '../db.js';
import { calculateDamage, calculateXpAward, checkLevelUp, damageBoss, rollLoot } from '../services/battle.js';
import type { Player, Boss, Activity, BattleResult } from '@boss-battle-trainer/shared';

interface BossRow {
  id: number;
  name: string;
  order: number;
  maxHp: number;
  currentHp: number;
  defeated: number;
  flavorText: string;
}

const router = Router();

router.post('/activities', (req, res) => {
  const { type, distanceMi, elevationGainFt, durationMin, date } = req.body;

  const player = db.prepare('SELECT * FROM players LIMIT 1').get() as Player;
  const bossRow = db.prepare('SELECT * FROM bosses WHERE defeated = 0 ORDER BY "order" LIMIT 1').get() as BossRow | undefined;

  if (!bossRow) {
    res.status(400).json({ error: 'No active boss to fight' });
    return;
  }

  const boss: Boss = { ...bossRow, defeated: Boolean(bossRow.defeated) };
  const activity: Activity = { id: 0, type, distanceMi, elevationGainFt, durationMin, date };

  const { damage, wasCrit } = calculateDamage(activity, player);
  const xpAwarded = calculateXpAward(damage);
  const levelResult = checkLevelUp(player, xpAwarded);
  const bossResult = damageBoss(boss, damage);
  const lootDropped = bossResult.defeated ? rollLoot() : null;

  db.prepare(`
    UPDATE players SET level = ?, xp = ?, xpToNextLevel = ?, unspentStatPoints = ? WHERE id = ?
  `).run(levelResult.level, levelResult.xp, levelResult.xpToNextLevel, levelResult.unspentStatPoints, player.id);

  db.prepare(`
    UPDATE bosses SET currentHp = ?, defeated = ? WHERE id = ?
  `).run(bossResult.currentHp, bossResult.defeated ? 1 : 0, boss.id);

  db.prepare(`
    INSERT INTO activities (type, distanceMi, elevationGainFt, durationMin, date, damageDealt, wasCrit, xpAwarded, bossDefeated, lootItemId)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    activity.type,
    activity.distanceMi,
    activity.elevationGainFt,
    activity.durationMin,
    activity.date,
    damage,
    wasCrit ? 1 : 0,
    xpAwarded,
    bossResult.defeated ? 1 : 0,
    lootDropped ? lootDropped.id : null
  );

  const result: BattleResult = {
    damageDealt: damage,
    wasCrit,
    xpAwarded,
    leveledUp: levelResult.leveledUp,
    bossDefeated: bossResult.defeated,
    lootDropped,
  };

  res.json(result);
});

export default router;
