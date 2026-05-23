// Übungsvorschlag-Service
//
// Strategie:
// 1) Bestimme erholte Muskelgruppen (fatigue < 0.3, base_size = large oder medium).
// 2) Bevorzuge Muskelgruppen, die in den letzten 7 Tagen *weniger* trainiert wurden.
// 3) Falls eine Seite (z.B. Brust) bereits stark belastet wurde → Antagonist (Rücken).
// 4) Filtere Übungen auf vom Nutzer installierte Pakete.

import { query } from '../db.js';
import { computeMuscleState } from './regeneration.js';

export async function suggestNextExercises(userId, limit = 5) {
  // Welche Pakete hat der Nutzer installiert? Default: alle is_default
  const userPkgsRes = await query(
    `SELECT package_id FROM user_packages WHERE user_id = $1`, [userId]
  );
  let pkgIds = userPkgsRes.rows.map(r => r.package_id);
  if (pkgIds.length === 0) {
    const def = await query(`SELECT id FROM packages WHERE is_default = TRUE`);
    pkgIds = def.rows.map(r => r.id);
  }

  const state = await computeMuscleState(userId);
  const stateBySlug = new Map(state.map(s => [s.muscle_slug, s]));

  // Trainings-Häufigkeit der letzten 7 Tage je Muskel
  const freqRes = await query(`
    SELECT m.slug, COUNT(*)::int AS hits
    FROM workout_sets ws
    JOIN workouts w   ON w.id = ws.workout_id AND w.user_id = $1
    JOIN exercise_muscles em ON em.exercise_id = ws.exercise_id
    JOIN muscles m    ON m.id = em.muscle_id
    WHERE ws.performed_at > NOW() - INTERVAL '7 days'
      AND em.involvement = 'primary'
    GROUP BY m.slug
  `, [userId]);
  const freq = new Map(freqRes.rows.map(r => [r.slug, r.hits]));

  // Score je Muskel: niedrige Fatigue + niedrige Frequenz = hoher Score
  const muscleRes = await query(
    `SELECT id, slug, size_class, antagonist_slug FROM muscles
     WHERE size_class IN ('large','medium')`
  );
  const scored = muscleRes.rows.map(m => {
    const fat = stateBySlug.get(m.slug)?.fatigue || 0;
    const hits7d = freq.get(m.slug) || 0;
    if (fat > 0.6) return null;                              // noch zu müde
    const sizeBoost = m.size_class === 'large' ? 1.0 : 0.7;
    // Antagonist-Bonus: wenn Antagonist heute schon trainiert wurde
    const antaHits = m.antagonist_slug ? (freq.get(m.antagonist_slug) || 0) : 0;
    const antaBoost = antaHits > 0 ? 0.4 : 0;
    const score = sizeBoost * (1 - fat) - 0.2 * hits7d + antaBoost;
    return { slug: m.slug, id: m.id, score };
  }).filter(Boolean).sort((a, b) => b.score - a.score);

  if (scored.length === 0) return [];

  // Top-Muskeln, dafür passende Übungen aus Paketen
  const topSlugs = scored.slice(0, 6).map(s => s.slug);
  const exRes = await query(`
    SELECT DISTINCT e.id, e.slug, e.name_key, e.category, e.modality, e.met_value, m.slug AS target_slug
    FROM exercises e
    JOIN exercise_muscles em ON em.exercise_id = e.id AND em.involvement = 'primary'
    JOIN muscles m ON m.id = em.muscle_id
    WHERE m.slug = ANY($1)
      AND (e.package_id = ANY($2) OR (e.is_custom = TRUE AND e.owner_user_id = $3))
    LIMIT 50
  `, [topSlugs, pkgIds, userId]);

  // Eine Übung pro Top-Muskel zurückgeben
  const seen = new Set();
  const out = [];
  for (const slug of topSlugs) {
    const hit = exRes.rows.find(r => r.target_slug === slug && !seen.has(r.id));
    if (hit) { seen.add(hit.id); out.push({ ...hit, reason_muscle: slug }); }
    if (out.length >= limit) break;
  }
  return out;
}
