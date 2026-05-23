import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api.js';
import { useT } from '../state/i18n.jsx';
import StretchProgram from '../components/StretchProgram.jsx';

export default function WorkoutPage() {
  const { t } = useT();
  const nav = useNavigate();
  const [active, setActive] = useState(null);
  const [exercises, setExercises] = useState([]);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState({ sets:'3', reps:'10', weight_kg:'', duration_s:'', rpe:'' });
  const [summary, setSummary] = useState(null);
  const [phase, setPhase] = useState('log');   // 'log' | 'stretch' | 'summary'
  const [endedWorkoutId, setEndedWorkoutId] = useState(null);

  useEffect(() => {
    api.activeWorkout().then(setActive);
    api.exercises().then(setExercises);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return exercises.slice(0, 30);
    return exercises.filter(e => {
      const name = (t(e.name_key, e.slug) || '').toLowerCase();
      return name.includes(q) || e.slug.includes(q);
    }).slice(0, 30);
  }, [exercises, query, t]);

  const set = k => e => setForm({ ...form, [k]: e.target.value });

  async function startIfNeeded() {
    if (active) return active;
    const w = await api.startWorkout();
    setActive({ ...w, sets: [] });
    return w;
  }

  async function addSet() {
    if (!selected) return;
    const w = await startIfNeeded();
    const payload = {
      exercise_id: selected.id,
      sets: form.sets ? Number(form.sets) : null,
      reps: form.reps ? Number(form.reps) : null,
      weight_kg: form.weight_kg ? Number(form.weight_kg) : null,
      duration_s: form.duration_s ? Number(form.duration_s) * 60 : null,  // Eingabe in Minuten
      rpe: form.rpe ? Number(form.rpe) : null,
    };
    const newSet = await api.addSet(w.id, payload);
    const fresh = await api.activeWorkout();
    setActive(fresh);
    // Reset – Übung bleibt selektiert
  }

  async function removeSet(id) {
    await api.deleteSet(id);
    const fresh = await api.activeWorkout();
    setActive(fresh);
  }

  async function endWorkout() {
    if (!active) return;
    const s = await api.endWorkout(active.id);
    setSummary(s);
    setEndedWorkoutId(active.id);
    setActive(null);
    setPhase('stretch');
  }

  async function downloadIcs() {
    const { token } = await api.calendarToken();
    const url = `/api/calendar/next.ics?token=${encodeURIComponent(token)}`;
    window.location.href = url;
  }

  if (phase === 'stretch') {
    return (
      <main>
        <StretchProgram
          workoutId={endedWorkoutId}
          onDone={() => setPhase('summary')}
          onSkip={() => setPhase('summary')}
        />
      </main>
    );
  }

  if (phase === 'summary' && summary) {
    const recoveredAt = summary.recovered_at ? new Date(summary.recovered_at) : null;
    return (
      <main>
        <div className="card">
          <h1>{t('workout.summary','Trainingszusammenfassung')}</h1>
          <p className="muted">{summary.sets} Sätze · <strong>{Number(summary.total_kcal).toFixed(0)} kcal</strong></p>
          {recoveredAt && (
            <p>
              {t('workout.recovered_at','Erholung voraussichtlich bis')}:{' '}
              <strong>{recoveredAt.toLocaleString('de-DE', { weekday:'short', day:'2-digit', month:'2-digit', hour:'2-digit', minute:'2-digit' })}</strong>
            </p>
          )}
          <button className="primary" style={{width:'100%', marginTop:'0.6rem'}} onClick={downloadIcs}>
            {t('phase2.calendar.download','Termin als Kalender (.ics) laden')}
          </button>
          <button style={{width:'100%', marginTop:'0.4rem'}} onClick={() => nav('/')}>Fertig</button>
        </div>
      </main>
    );
  }

  const isCardio = selected && selected.category === 'cardio';

  return (
    <>
      <header className="topbar">
        <h1>{t('nav.workout','Training')}</h1>
        {active && <button className="ghost" onClick={endWorkout}>{t('home.end_workout','beenden')}</button>}
      </header>
      <main>
        {!active && (
          <div className="card">
            <p className="muted">{t('workout.no_active','Kein aktives Training. Füge einen Satz hinzu, um zu starten.')}</p>
          </div>
        )}

        <div className="card">
          <input placeholder={t('workout.search_exercise','Übung suchen…')}
            value={query} onChange={e => setQuery(e.target.value)} />
          <ul className="stack" style={{listStyle:'none', padding:0, margin:'0.6rem 0 0', maxHeight: 240, overflowY:'auto'}}>
            {filtered.map(e => (
              <li key={e.id}
                  onClick={() => setSelected(e)}
                  style={{
                    padding: '0.5rem',
                    background: selected?.id === e.id ? 'var(--bg-elev)' : 'transparent',
                    borderRadius: '0.4rem',
                    cursor: 'pointer',
                    borderBottom: '1px solid var(--border)'
                  }}>
                <div className="row between">
                  <span>{t(e.name_key, e.slug)}</span>
                  <span className="pill">{e.category}</span>
                </div>
              </li>
            ))}
            {filtered.length === 0 && <li className="muted">Keine Treffer</li>}
          </ul>
        </div>

        {selected && (
          <div className="card">
            <h2>{t(selected.name_key, selected.slug)}</h2>
            {isCardio
              ? (
                <div className="grid-2">
                  <label><div className="muted">{t('workout.duration','Dauer (min)')}</div>
                    <input type="number" value={form.duration_s} onChange={set('duration_s')} /></label>
                  <label><div className="muted">{t('workout.rpe','Anstrengung (1–10)')}</div>
                    <input type="number" min="1" max="10" value={form.rpe} onChange={set('rpe')} /></label>
                </div>
              ) : (
                <>
                  <div className="grid-2">
                    <label><div className="muted">{t('workout.sets','Sätze')}</div>
                      <input type="number" value={form.sets} onChange={set('sets')} /></label>
                    <label><div className="muted">{t('workout.reps','Wiederholungen')}</div>
                      <input type="number" value={form.reps} onChange={set('reps')} /></label>
                  </div>
                  <div className="grid-2" style={{marginTop:'0.5rem'}}>
                    <label><div className="muted">{t('workout.weight','Gewicht (kg)')}</div>
                      <input type="number" step="0.5" value={form.weight_kg} onChange={set('weight_kg')} /></label>
                    <label><div className="muted">{t('workout.rpe','RPE')}</div>
                      <input type="number" min="1" max="10" value={form.rpe} onChange={set('rpe')} /></label>
                  </div>
                </>
              )
            }
            <button className="primary" style={{marginTop:'0.6rem', width:'100%'}} onClick={addSet}>
              {t('workout.add_set','Satz hinzufügen')}
            </button>
          </div>
        )}

        {active && active.sets && active.sets.length > 0 && (
          <div className="card">
            <h2>Heutige Sätze</h2>
            <ul className="stack" style={{listStyle:'none', padding:0, margin:0}}>
              {active.sets.map(s => (
                <li key={s.id} className="row between" style={{padding:'0.5rem 0', borderBottom:'1px solid var(--border)'}}>
                  <div>
                    <strong>{t(s.name_key, s.exercise_slug)}</strong>
                    <div className="muted" style={{fontSize:'0.85rem'}}>
                      {s.category === 'cardio'
                        ? `${Math.round((s.duration_s||0)/60)} min`
                        : `${s.sets || 0}×${s.reps || 0}${s.weight_kg ? ` × ${s.weight_kg} kg` : ''}`}
                      {' · '}{Number(s.kcal || 0).toFixed(0)} kcal
                    </div>
                  </div>
                  <button className="ghost" onClick={() => removeSet(s.id)}>×</button>
                </li>
              ))}
            </ul>
            <div className="row between" style={{marginTop:'0.6rem'}}>
              <strong>{t('workout.total_kcal','Gesamt-kcal')}</strong>
              <strong>{active.sets.reduce((a,s) => a + Number(s.kcal||0), 0).toFixed(0)}</strong>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
