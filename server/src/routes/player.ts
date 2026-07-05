import { Router } from 'express';
import db from '../db.js';
import type { Player } from '@boss-battle-trainer/shared';

const router = Router();

router.get('/player', (_req, res) => {
    const player = db.prepare('SELECT * FROM players LIMIT 1').get() as Player;
    res.json(player);
});

export default router;