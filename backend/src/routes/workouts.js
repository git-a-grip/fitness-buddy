import { Router } from 'express';
import { query } from '../db.js';
import { authRequired } from '../middleware/auth.js';
import { computeKcal } from '../services/kcal.js';
import { nextRecoveryTime, workoutKcalSum } from '../services/recovery_time.js';

const r = Router();

// Aktives Workout abrufen oder neu starten
r.get('/active', authRequired, async (req, res) => {
  const { rows } = await query(
    `SELECT * FROM workouts WHERE user_id = $1 AND ended_at IS NULL
     ORDER BY started_at DESC LIMIT 1`, [req.user.id]
  );
  if (rows.length === 0) return res.json(null);

  const sets = await query(`
    SELECT ws.*, e.slug AS exercise_slug, e.name_key, e.category
    FROM workout_sets ws JOIN exercises e ON e.id = ws.exercise_id
    WHERE ws.workout_id = $1 ORDER BY ws.performed_at`, [rows[0].id]);
  res.json({ ...rows[0], sets: sets.rows });
});

r.post('/start', authRequired, async (req, res) => {
  const exists = await query(
    `SELECT id FROM workouts WHERE user_id = $1 AND ended_at IS NULL`, [req.user.id]);
  if (exists.rowCount > 0) return res.json({ id: exists.rows[0].id, resumed: true });

  const { rows } = await query(
    `INSERT INTO workouts (user_id) VALUES ($1) RETURNING *`, [req.user.id]);
  res.json(rows[0]);
});

r.post('/:id/end', authRequired, async (req, res) => {
  await query(`UPDATE workouts SET ended_at = NOW()
               WHERE id = $1 AND user_id = $2 AND ended_at IS NULL`,
    [req.params.id, req.user.id]);
  const summary = await query(`
    SELECT COUNT(*)::int AS sets, COALESCE(SUM(ws.kcal),0)::numeric AS total_kcal
    FROM workout_sets ws WHERE ws.workout_id = $1`, [req.params.id]);

  // Phase 2: Reminder einplanen für errechnete Erholungszeit
  const recoveredAt = await nextRecoveryTime(req.user.id);
  if (recoveredAt && recoveredAt > new Date()) {
    await query(`
      INSERT INTO scheduled_reminders (user_id, send_at, title, body, workout_id, payload)
      VALUES ($1, $2, $3, $4, $5, $6)`,
      [req.user.id, recoveredAt,
       'Fitness Buddy – bereit für die nächste Einheit!',
       `Deine Muskulatur ist regeneriert. Letztes Training: ${Number(summary.rows[0].total_kcal).toFixed(0)} kcal.`,
       req.params.id, JSON.stringify({ kind: 'next_workout' })]);
  }

  res.json({
    ...summary.rows[0],
    recovered_at: recoveredAt,
  });
});

// Satz hinzufügen
r.post('/:id/sets', authRequired, async (req, res) => {
  const { exercise_id, sets, reps, weight_kg, duration_s, distance_m, rpe } = req.body || {};
  if (!exercise_id) return res.status(400).json({ error: 'missing_exercise' });

  // Übung holen für kcal-Berechnung
  const exR = await query(
    `SELECT id, category, met_value, default_intensity FROM exercises WHERE id = $1`,
    [exercise_id]);
  if (exR.rowCount === 0) return res.status(400).json({ error: 'unknown_exercise' });

  // Gewicht des Nutzers
  const userR = await query(`SELECT weight_kg FROM users WHERE id = $1`, [req.user.id]);
  const weightKg = userR.rows[0]?.weight_kg || 75;

  const kcal = computeKcal({
    exercise: exR.rows[0],
    weightKg,
    sets, reps, weight_lifted_kg: weight_kg,
    duration_s, rpe,
  });

  const ins = await query(`
    INSERT INTO workout_sets (workout_id, exercise_id, sets, reps, weight_kg, duration_s, distance_m, rpe, kcal)
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
    RETURNING *`,
    [req.params.id, exercise_id, sets || null, reps || null, weight_kg || null,
     duration_s || null, distance_m || null, rpe || null, kcal]);
  res.json(ins.rows[0]);
});

r.delete('/sets/:setId', authRequired, async (req, res) => {
  await query(`DELETE FROM workout_sets ws
               USING workouts w
               WHERE ws.id = $1 AND ws.workout_id = w.id AND w.user_id = $2`,
    [req.params.setId, req.user.id]);
  res.json({ ok: true });
});

r.get('/history', authRequired, async (req, res) => {
  const { rows } = await query(`
    SELECT w.id, w.started_at, w.ended_at,
           COUNT(ws.id)::int AS set_count,
           COALESCE(SUM(ws.kcal),0)::numeric AS total_kcal
    FROM workouts w
    LEFT JOIN workout_sets ws ON ws.workout_id = w.id
    WHERE w.user_id = $1 AND w.ended_at IS NOT NULL
    GROUP BY w.id
    ORDER BY w.started_at DESC
    LIMIT 50`, [req.user.id]);
  res.json(rows);
});

export default r;
