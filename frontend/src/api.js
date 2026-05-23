const BASE = import.meta.env.VITE_API_BASE || '/api';

function authHeaders() {
  const t = localStorage.getItem('fb_token');
  return t ? { Authorization: `Bearer ${t}` } : {};
}

async function req(method, path, body) {
  const opts = {
    method,
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
  };
  if (body !== undefined) opts.body = JSON.stringify(body);
  const res = await fetch(`${BASE}${path}`, opts);
  if (!res.ok) {
    const e = await res.json().catch(() => ({}));
    throw new Error(e.error || `HTTP ${res.status}`);
  }
  return res.json();
}

export const api = {
  // Auth
  register: (data) => req('POST', '/auth/register', data),
  login:    (data) => req('POST', '/auth/login', data),

  // Muscles
  muscles:        () => req('GET', '/muscles'),
  muscleState:    () => req('GET', '/muscles/state'),

  // Exercises
  exercises:      () => req('GET', '/exercises'),
  createCustomExercise: (d) => req('POST', '/exercises/custom', d),

  // Packages
  packages:       () => req('GET', '/packages'),
  installPkg:     (id) => req('POST', `/packages/${id}/install`),
  uninstallPkg:   (id) => req('POST', `/packages/${id}/uninstall`),

  // Workouts
  activeWorkout:  () => req('GET', '/workouts/active'),
  startWorkout:   () => req('POST', '/workouts/start'),
  endWorkout:     (id) => req('POST', `/workouts/${id}/end`),
  addSet:         (workoutId, d) => req('POST', `/workouts/${workoutId}/sets`, d),
  deleteSet:      (setId) => req('DELETE', `/workouts/sets/${setId}`),
  history:        () => req('GET', '/workouts/history'),

  // Stats
  statsSummary:   (days = 30) => req('GET', `/stats/summary?days=${days}`),
  dailyKcal:      (days = 30) => req('GET', `/stats/daily_kcal?days=${days}`),
  neglected:      () => req('GET', '/stats/neglected'),
  overtrained:    () => req('GET', '/stats/overtrained'),

  // i18n
  translations:   (locale) => req('GET', `/i18n/${locale}`),

  // Knowledge
  knowledge:      () => req('GET', '/knowledge'),

  // Plans
  plans:          () => req('GET', '/plans'),
  createPlan:     (name) => req('POST', '/plans', { name }),
  addPlanItem:    (id, d) => req('POST', `/plans/${id}/items`, d),
  deletePlan:     (id) => req('DELETE', `/plans/${id}`),
  deletePlanItem: (id) => req('DELETE', `/plans/items/${id}`),

  // Suggestions
  nextSuggestions:(limit = 5) => req('GET', `/suggestions/next?limit=${limit}`),

  // Push
  vapidKey:       () => req('GET', '/push/vapid_public_key'),
  pushSubscribe:  (sub) => req('POST', '/push/subscribe', sub),
  pushUnsubscribe:(endpoint) => req('POST', '/push/unsubscribe', { endpoint }),
  pushTest:       () => req('POST', '/push/test'),

  // Calendar
  calendarToken:  () => req('GET', '/calendar/token'),

  // Intakes
  intakes:        (days = 14) => req('GET', `/intakes?days=${days}`),
  addIntake:      (d) => req('POST', '/intakes', d),
  deleteIntake:   (id) => req('DELETE', `/intakes/${id}`),
  intakeSummary:  (days = 30) => req('GET', `/intakes/summary?days=${days}`),

  // Stretching
  stretchSuggest: () => req('GET', '/stretching/suggest'),
  stretchDone:    (workout_id, duration_s) => req('POST', '/stretching/done', { workout_id, duration_s }),
};
