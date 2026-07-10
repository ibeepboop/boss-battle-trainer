import express from 'express';
import cors from 'cors';
import './db.js';
import playerRouter from './routes/player.js';
import bossesRouter from './routes/bosses.js';
import activitiesRouter from './routes/activities.js';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use('/api', playerRouter);
app.use('/api', bossesRouter);
app.use('/api', activitiesRouter);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});