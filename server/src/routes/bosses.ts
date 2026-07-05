import { Router } from 'express';
import db from '../db.js';
import type { Boss } from '@boss-battle-trainer/shared';

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

router.get('/bosses', (_req, res) => {
    const rows = db.prepare('SELECT * FROM bosses ORDER BY "order"').all() as BossRow[];
    const bosses: Boss[] = rows.map((row) => ({ ...row, defeated: Boolean(row.defeated) }));
    res.json(bosses);
});

export default router;