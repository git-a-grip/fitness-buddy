// Sportmedizinisches Regenerationsmodell.
//
// Pro Muskel hat jeder Satz eine "Fatigue-Last" F. Die verbliebene Belastung
// fällt exponentiell ab:  F(t) = F0 * 0.5^(t / HL_effective)
//
// Effektive Halbwertszeit:  HL_eff = HL_base * (1 + 0.6 * load_ratio)
//   load_ratio = empirisch normalisiertes Volumen pro Satz (0..1+)
//
// Beteiligungsgrad eines Muskels an einer Übung:
//   primary    = 1.0
//   secondary  = 0.5
//   stabilizer = 0.2

import { query } from '../db.js';

const INVOLVEMENT_WEIGHT = { primary: 1.0, secondary: 0.5, stabilizer: 0.2 };

function setLoad({ category, sets, reps, weight_kg, duration_s, rpe, default_intensity }) {
  if (category === 'cardio') {
    // Cardio-Belastung pro Muskel: 0..1 abhängig von Dauer + Intensität
    const minutes = (Number(duration_s) || 0) / 60;
    const r = (rpe ? Number(rpe) / 10 : 0.6);
    const di = Number(default_intensity) || 1.0;
    return Math.min(1.4, (minutes / 30) * r * di);
  }
  // Strength: normalisiert auf "10 Wiederholungen mit moderatem Gewicht"
  const s = Number(sets) || 0;
  const r = Number(reps) || 0;
  const w = Number(weight_kg) || 0;
  const di = Number(default_intensity) || 1.0;
  // Tonnage relativ zu Referenz 3x10x40kg = 1200 kg
  const tonnage = s * r * (w > 0 ? w : 20);
  const base = tonnage / 1200;
  const rpeFactor = rpe ? 0.7 + (Number(rpe) - 5) * 0.06 : 1.0;
  return Math.min(2.0, base * rpeFactor * di);
}

function effectiveHalfLife(baseH, load) {
  return baseH * (1 + 0.6 * Math.min(2.0, load));
}

// Liefert für jeden Muskel: aktuelle Fatigue 0..1, Halbwertszeit (h), seit letzter Belastung
export async function computeMuscleState(userId, now = new Date()) {
  // Alle Sätze der letzten 10 Tage, mit Muskeln und Übungsdaten
  const sql = `
    SELECT ws.id          AS set_id,
           ws.performed_at,
           ws.sets, ws.reps, ws.weight_kg, ws.duration_s, ws.rpe,
           e.category, e.default_intensity,
           em.muscle_id, em.involvement,
           m.slug AS muscle_slug, m.base_half_life_h
    FROM workout_sets ws
    JOIN workouts w   ON w.id = ws.workout_id AND w.user_id = $1
    JOIN exercises e  ON e.id = ws.exercise_id
    JOIN exercise_muscles em ON em.exercise_id = e.id
    JOIN muscles m    ON m.id = em.muscle_id
    WHERE ws.performed_at > NOW() - INTERVAL '10 days'
  `;
  const { rows } = await query(sql, [userId]);

  // Aggregiere pro Muskel
  const state = new Map();   // muscle_slug -> { fatigue, lastAt, hits, hl }
  for (const r of rows) {
    const load = setLoad(r);
    const weight = INVOLVEMENT_WEIGHT[r.involvement] || 0;
    const hl = effectiveHalfLife(Number(r.base_half_life_h), load);
    const performed = new Date(r.performed_at);
    const hoursAgo = (now - performed) / 3_600_000;
    const remaining = load * weight * Math.pow(0.5, hoursAgo / hl);

    const cur = state.get(r.muscle_slug) || {
      muscle_slug: r.muscle_slug,
      muscle_id: r.muscle_id,
      base_half_life_h: Number(r.base_half_life_h),
      fatigue: 0,
      hits: 0,
      last_at: null,
      effective_hl_h: hl,
    };
    cur.fatigue += remaining;
    cur.hits += 1;
    if (!cur.last_at || performed > new Date(cur.last_at)) cur.last_at = performed;
    cur.effective_hl_h = Math.max(cur.effective_hl_h, hl);
    state.set(r.muscle_slug, cur);
  }

  // Cap auf 1.5 (deepred); berechne Recovery-Zeitpunkt (Fatigue < 0.1)
  return Array.from(state.values()).map(s => {
    const fatigue = Math.min(1.5, s.fatigue);
    const hoursUntilRecovered = fatigue > 0.1
      ? s.effective_hl_h * Math.log2(fatigue / 0.1)
      : 0;
    const recoveredAt = new Date(now.getTime() + hoursUntilRecovered * 3_600_000);
    return {
      muscle_slug: s.muscle_slug,
      muscle_id: s.muscle_id,
      fatigue,
      hits: s.hits,
      last_at: s.last_at,
      effective_hl_h: Math.round(s.effective_hl_h * 10) / 10,
      recovered_at: recoveredAt,
    };
  });
}

// Liefert auch eine flache map slug -> fatigue (zum schnellen SVG-Färben)
export async function muscleStateMap(userId) {
  const list = await computeMuscleState(userId);
  const map = {};
  for (const m of list) map[m.muscle_slug] = m;
  return map;
}
