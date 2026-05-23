import { Router } from 'express';
import { query } from '../db.js';
import { authRequired } from '../middleware/auth.js';
import { suggestStretches } from '../services/stretching.js';

const r = Router();

r.get('/suggest', authRequired, async (req, res) => {
  const out = await suggestStretches(req.user.id);
  res.json(out);
});

r.post('/done', authRequired, async (req, res) => {
  const { workout_id, duration_s } = req.body || {};
  if (!workout_id) return res.status(400).json({ error: 'missing_workout' });
  await query(`
    INSERT INTO workout_stretches (workout_id, duration_s) VALUES ($1, $2)
    ON CONFLICT (workout_id) DO UPDATE SET completed_at = NOW(), duration_s = EXCLUDED.duration_s`,
    [workout_id, duration_s || null]);
  res.json({ ok: true });
});

export default r;
