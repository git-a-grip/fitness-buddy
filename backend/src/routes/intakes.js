import { Router } from 'express';
import { query } from '../db.js';
import { authRequired } from '../middleware/auth.js';

const r = Router();

r.get('/', authRequired, async (req, res) => {
  const days = Math.min(60, Number(req.query.days) || 14);
  const { rows } = await query(`
    SELECT id, kind, taken_at, amount, unit, workout_id
    FROM intakes
    WHERE user_id = $1 AND taken_at > NOW() - ($2 || ' days')::interval
    ORDER BY taken_at DESC`, [req.user.id, days]);
  res.json(rows);
});

r.post('/', authRequired, async (req, res) => {
  const { kind, amount, unit, workout_id, notes, taken_at } = req.body || {};
  if (!kind) return res.status(400).json({ error: 'missing_kind' });
  const { rows } = await query(`
    INSERT INTO intakes (user_id, kind, amount, unit, workout_id, notes, taken_at)
    VALUES ($1,$2,$3,$4,$5,$6, COALESCE($7::timestamptz, NOW()))
    RETURNING *`,
    [req.user.id, kind, amount || null, unit || null, workout_id || null, notes || null, taken_at || null]);
  res.json(rows[0]);
});

r.delete('/:id', authRequired, async (req, res) => {
  await query(`DELETE FROM intakes WHERE id = $1 AND user_id = $2`,
    [req.params.id, req.user.id]);
  res.json({ ok: true });
});

// Tagesübersicht (Anzahl je Kind in den letzten 7/30 Tagen)
r.get('/summary', authRequired, async (req, res) => {
  const days = Math.min(180, Number(req.query.days) || 30);
  const { rows } = await query(`
    SELECT kind,
           COUNT(*)::int AS count,
           COALESCE(SUM(amount),0)::numeric AS total_amount,
           MAX(taken_at)  AS last_at
    FROM intakes
    WHERE user_id = $1 AND taken_at > NOW() - ($2 || ' days')::interval
    GROUP BY kind ORDER BY kind`, [req.user.id, days]);
  res.json(rows);
});

export default r;
