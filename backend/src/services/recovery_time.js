// Berechnet, wann ein Workout vollständig erholt ist.
// = Maximum aller muscle.recovered_at, die durch dieses Workout neu belastet wurden.

import { query } from '../db.js';
import { computeMuscleState } from './regeneration.js';

export async function nextRecoveryTime(userId) {
  const state = await computeMuscleState(userId);
  if (state.length === 0) return null;
  const max = state.reduce((acc, s) => {
    const t = new Date(s.recovered_at).getTime();
    return t > acc ? t : acc;
  }, 0);
  return new Date(max);
}

export async function workoutKcalSum(workoutId) {
  const { rows } = await query(
    `SELECT COALESCE(SUM(kcal),0)::numeric AS total FROM workout_sets WHERE workout_id = $1`,
    [workoutId]);
  return Number(rows[0].total);
}
