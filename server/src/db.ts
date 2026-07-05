import Database from 'better-sqlite3';
import path from 'node:path';
import fs from 'node:fs';

const dataDir = path.join(import.meta.dirname, '..', 'data');
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
}
const db = new Database(path.join(dataDir, 'boss-battle-trainer.db'));

db.exec(`
    CREATE TABLE IF NOT EXISTS players (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        level INTEGER NOT NULL DEFAULT 1,
        xp INTEGER NOT NULL DEFAULT 0,
        xpToNextLevel INTEGER NOT NULL DEFAULT 100,
        str INTEGER NOT NULL DEFAULT 5,
        sta INTEGER NOT NULL DEFAULT 5,
        unspentStatPoints INTEGER NOT NULL DEFAULT 0
    );
    
    CREATE TABLE IF NOT EXISTS bosses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        "order" INTEGER NOT NULL,
        maxHp INTEGER NOT NULL,
        currentHp INTEGER NOT NULL,
        defeated INTEGER NOT NULL DEFAULT 0,
        flavorText TEXT NOT NULL
    );
`);

const playerCount = db.prepare('SELECT COUNT(*) AS count FROM players').get() as { count: number };
if (playerCount.count === 0) {
    db.prepare(`
        INSERT INTO players (name, level, xp, xpToNextLevel, str, sta, unspentStatPoints)
        VALUES (?, 1, 0, 100, 5, 5, 0)
        `).run('ibeepboop');
}

const bossCount = db.prepare('SELECT COUNT(*) AS count FROM bosses').get() as { count: number };
if (bossCount.count === 0) {
    const insertBoss = db.prepare(`
        INSERT INTO bosses (name, "order", maxHp, currentHp, defeated, flavorText)
        VALUES (?, ?, ?, ?, 0, ?)
    `);
    insertBoss.run('The Couch Goblin', 1, 100, 100, 'A lumpy horror born from months of skipped leg days.');
    insertBoss.run('Sir Shin-Splints', 2, 150, 150, 'Clad in ill-fitting armor, punishing those who skip warmups.');
    insertBoss.run('The Elevation Wyrm', 3, 250, 250, 'Coils through switchbacks, feeding on quad burn.');
    insertBoss.run('Blisterfiend', 4, 350, 350, 'A creature made entirely of bad sock choices.');
    insertBoss.run('The Bonk', 5, 500, 500, 'The final boss. It waits for those who forget to fuel.');
}
export default db;