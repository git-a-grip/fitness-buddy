import { Router } from 'express';
import { query } from '../db.js';
import { authRequired } from '../middleware/auth.js';

const r = Router();

r.get('/', authRequired, async (req, res) => {
  const { rows } = await query(`
    SELECT tp.id, tp.name, tp.created_at,
           COALESCE(json_agg(json_build_object(
             'id', tpi.id, 'exercise_id', tpi.exercise_id,
             'position', tpi.position,
             'target_sets', tpi.target_sets, 'target_reps', tpi.target_reps,
             'target_weight_kg', tpi.target_weight_kg, 'target_duration_s', tpi.target_duration_s,
             'exercise_slug', e.slug, 'name_key', e.name_key, 'category', e.category
           ) ORDER BY tpi.position) FILTER (WHERE tpi.id IS NOT NULL), '[]') AS items
    FROM training_plans tp
    LEFT JOIN training_plan_items tpi ON tpi.plan_id = tp.id
    LEFT JOIN exercises e ON e.id = tpi.exercise_id
    WHERE tp.user_id = $1
    GROUP BY tp.id ORDER BY tp.created_at DESC`, [req.user.id]);
  res.json(rows);
});

r.post('/', authRequired, async (req, res) => {
  const { name } = req.body || {};
  if (!name) return res.status(400).json({ error: 'missing_name' });
  const { rows } = await query(
    `INSERT INTO training_plans (user_id, name) VALUES ($1,$2) RETURNING *`,
    [req.user.id, name]);
  res.json(rows[0]);
});

r.post('/:id/items', authRequired, async (req, res) => {
  const { exercise_id, target_sets, target_reps, target_weight_kg, target_duration_s, position } = req.body || {};
  if (!exercise_id) return res.status(400).json({ error: 'missing_exercise' });
  // Ownership check
  const own = await query(`SELECT id FROM training_plans WHERE id=$1 AND user_id=$2`,
    [req.params.id, req.user.id]);
  if (own.rowCount === 0) return res.status(404).json({ error: 'not_found' });
  const { rows } = await query(`
    INSERT INTO training_plan_items
      (plan_id, exercise_id, target_sets, target_reps, target_weight_kg, target_duration_s, position)
    VALUES ($1,$2,$3,$4,$5,$6,COALESCE($7,0))
    RETURNING *`,
    [req.params.id, exercise_id, target_sets || null, target_reps || null,
     target_weight_kg || null, target_duration_s || null, position]);
  res.json(rows[0]);
});

r.delete('/:id', authRequired, async (req, res) => {
  await query(`DELETE FROM training_plans WHERE id=$1 AND user_id=$2`,
    [req.params.id, req.user.id]);
  res.json({ ok: true });
});

r.delete('/items/:itemId', authRequired, async (req, res) => {
  await query(`DELETE FROM training_plan_items tpi
               USING training_plans tp
               WHERE tpi.id=$1 AND tpi.plan_id = tp.id AND tp.user_id=$2`,
    [req.params.itemId, req.user.id]);
  res.json({ ok: true });
});

export default r;
