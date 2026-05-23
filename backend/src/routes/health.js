import { Router } from 'express';
import { query } from '../db.js';
import { vapidPublicKey } from '../services/push.js';

const r = Router();
const startedAt = Date.now();

// Liveness: Prozess antwortet
r.get('/', (_req, res) => res.json({ ok: true }));

// Readiness: DB erreichbar, Schema vorhanden, Counts sinnvoll
r.get('/ready', async (_req, res) => {
  const checks = {};
  let ok = true;

  // DB-Konnektivität + Latenz
  const t0 = Date.now();
  try {
    const { rows } = await query('SELECT NOW() AS now, current_database() AS db, version() AS version');
    checks.db = {
      ok: true,
      latency_ms: Date.now() - t0,
      name: rows[0].db,
      version: String(rows[0].version).split(' on ')[0],
      server_time: rows[0].now,
    };
  } catch (e) {
    ok = false;
    checks.db = { ok: false, error: e.message };
  }

  // Schema-Counts (nur wenn DB erreichbar)
  if (checks.db.ok) {
    try {
      const { rows } = await query(`
        SELECT
          (SELECT COUNT(*) FROM muscles)::int            AS muscles,
          (SELECT COUNT(*) FROM exercises)::int          AS exercises,
          (SELECT COUNT(*) FROM packages)::int           AS packages,
          (SELECT COUNT(*) FROM knowledge_articles)::int AS knowledge,
          (SELECT COUNT(*) FROM i18n)::int               AS translations,
          (SELECT COUNT(*) FROM users)::int              AS users,
          (SELECT COUNT(*) FROM workouts)::int           AS workouts,
          (SELECT COUNT(*) FROM workout_sets)::int       AS workout_sets
      `);
      checks.schema = { ok: true, counts: rows[0] };
      // Erwartung: Seeds sind eingespielt
      if (rows[0].muscles < 30 || rows[0].exercises < 50) {
        checks.schema.ok = false;
        checks.schema.warning = 'seeds_incomplete';
        ok = false;
      }
    } catch (e) {
      ok = false;
      checks.schema = { ok: false, error: e.message };
    }
  }

  // Push-Konfiguration
  checks.push = { ok: !!vapidPublicKey(), configured: !!vapidPublicKey() };

  const uptime_s = Math.round((Date.now() - startedAt) / 1000);
  const mem = process.memoryUsage();

  res.status(ok ? 200 : 503).json({
    ok,
    uptime_s,
    node: process.version,
    env: process.env.NODE_ENV || 'development',
    memory_mb: {
      rss: Math.round(mem.rss / 1024 / 1024),
      heap_used: Math.round(mem.heapUsed / 1024 / 1024),
    },
    checks,
  });
});

export default r;
