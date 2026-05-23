import { Router } from 'express';
import { query } from '../db.js';
import { authRequired } from '../middleware/auth.js';

const r = Router();

r.get('/summary', authRequired, async (req, res) => {
  const days = Math.min(180, Number(req.query.days) || 30);
  const sql = `
    WITH s AS (
      SELECT ws.*, e.category
      FROM workout_sets ws
      JOIN workouts w ON w.id = ws.workout_id AND w.user_id = $1
      JOIN exercises e ON e.id = ws.exercise_id
      WHERE ws.performed_at > NOW() - ($2 || ' days')::interval
    )
    SELECT
      (SELECT COUNT(*)::int FROM workouts WHERE user_id = $1
        AND started_at > NOW() - ($2 || ' days')::interval) AS workouts,
      COALESCE(SUM(kcal),0)::numeric AS total_kcal,
      COALESCE(SUM(CASE WHEN category='strength'
                       THEN COALESCE(sets,0)*COALESCE(reps,0)*COALESCE(weight_kg,0)
                       ELSE 0 END),0)::numeric AS total_volume_kg,
      COALESCE(SUM(COALESCE(duration_s,0)),0)::int AS total_cardio_s
    FROM s`;
  const { rows } = await query(sql, [req.user.id, days]);
  res.json(rows[0]);
});

// kcal pro Tag (für Diagramm)
r.get('/daily_kcal', authRequired, async (req, res) => {
  const days = Math.min(180, Number(req.query.days) || 30);
  const { rows } = await query(`
    SELECT date_trunc('day', ws.performed_at)::date AS day,
           COALESCE(SUM(ws.kcal),0)::numeric AS kcal
    FROM workout_sets ws
    JOIN workouts w ON w.id = ws.workout_id AND w.user_id = $1
    WHERE ws.performed_at > NOW() - ($2 || ' days')::interval
    GROUP BY 1 ORDER BY 1`, [req.user.id, days]);
  res.json(rows);
});

// Vernachlässigte Muskeln (in 14 Tagen nicht primär trainiert)
r.get('/neglected', authRequired, async (req, res) => {
  const { rows } = await query(`
    SELECT m.id, m.slug, m.name_key, m.region, m.size_class
    FROM muscles m
    WHERE m.size_class IN ('large','medium')
      AND m.slug NOT IN (
        SELECT DISTINCT mm.slug
        FROM workout_sets ws
        JOIN workouts w ON w.id = ws.workout_id AND w.user_id = $1
        JOIN exercise_muscles em ON em.exercise_id = ws.exercise_id AND em.involvement IN ('primary','secondary')
        JOIN muscles mm ON mm.id = em.muscle_id
        WHERE ws.performed_at > NOW() - INTERVAL '14 days'
      )
    ORDER BY m.size_class DESC, m.region`, [req.user.id]);
  res.json(rows);
});

// Mehrfach belastete Muskeln (gelbe Umrandung) – mehr als 3 Hits in 48h
r.get('/overtrained', authRequired, async (req, res) => {
  const { rows } = await query(`
    SELECT m.slug, m.name_key, COUNT(*)::int AS hits
    FROM workout_sets ws
    JOIN workouts w ON w.id = ws.workout_id AND w.user_id = $1
    JOIN exercise_muscles em ON em.exercise_id = ws.exercise_id AND em.involvement = 'primary'
    JOIN muscles m ON m.id = em.muscle_id
    WHERE ws.performed_at > NOW() - INTERVAL '48 hours'
    GROUP BY m.slug, m.name_key
    HAVING COUNT(*) >= 3`, [req.user.id]);
  res.json(rows);
});

export default r;
