// kcal-Berechnung nach Compendium of Physical Activities (Ainsworth et al. 2011)
//   kcal = MET × Körpergewicht(kg) × Dauer(h)
// Für Krafttraining wird zusätzlich ein Volumen-Korrekturfaktor verwendet,
// da die MET-Zahl pauschal ist und schweres Training mehr Energie kostet.

const STRENGTH_SET_SECONDS = 45;    // typische Satzdauer inkl. Pause-Anteil
const SET_REST_SECONDS = 60;        // mittlere Pause

export function computeKcal({ exercise, weightKg, sets, reps, weight_lifted_kg, duration_s, rpe }) {
  const userKg = Number(weightKg) || 75;
  const met = Number(exercise.met_value) || 4.0;
  const intensity = Number(exercise.default_intensity) || 1.0;

  if (exercise.category === 'cardio') {
    const hours = (Number(duration_s) || 0) / 3600;
    return roundKcal(met * userKg * hours * intensity);
  }

  // Strength / bodyweight / mobility:
  // 1) Zeitkomponente (Sätze × Satzdauer inkl. Pause)
  const totalSeconds = (Number(sets) || 0) * (STRENGTH_SET_SECONDS + SET_REST_SECONDS);
  const hours = totalSeconds / 3600;
  let kcal = met * userKg * hours * intensity;

  // 2) Volumen-Bonus für hohe Lasten (mechanische Arbeit)
  if (weight_lifted_kg && reps && sets) {
    // Hubhöhe ~0.5 m, Effizienz ~25%
    const totalLiftedKg = Number(weight_lifted_kg) * Number(reps) * Number(sets);
    const mechWorkJ = totalLiftedKg * 9.81 * 0.5;          // Joule
    const mechWorkKcal = mechWorkJ / 4184 / 0.25;          // Wirkungsgrad 25%
    kcal += mechWorkKcal;
  }

  // 3) RPE-Skalierung (1–10, neutral bei 7)
  if (rpe) {
    const f = 0.85 + (Number(rpe) - 5) * 0.05;             // 0.6 bei RPE 0, 1.1 bei RPE 10
    kcal *= Math.max(0.6, Math.min(1.2, f));
  }

  return roundKcal(kcal);
}

function roundKcal(v) {
  return Math.round(v * 10) / 10;
}
