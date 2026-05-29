import { useEffect, useState } from 'react';
import { api } from '../api.js';
import { useT } from '../state/i18n.jsx';

function epley(w, r)  { return r === 1 ? w : w * (1 + r / 30); }
function brzycki(w, r) { return r === 1 ? w : w / (1.0278 - 0.0278 * r); }

export default function OneRMCalculator() {
  const { t } = useT();
  const [weight, setWeight] = useState('');
  const [reps, setReps]     = useState('');
  const [result, setResult] = useState(null);
  const [lastSet, setLastSet] = useState(null);
  const [loadedFrom, setLoadedFrom] = useState(null);

  useEffect(() => {
    api.lastStrengthSet().then(setLastSet).catch(() => {});
  }, []);

  function calculate(w, r) {
    const wn = Number(w);
    const rn = Number(r);
    if (!wn || wn <= 0 || !rn || rn <= 0 || rn > 30) {
      setResult(null);
      return;
    }
    const ep = epley(wn, rn);
    const br = brzycki(wn, rn);
    const avg = (ep + br) / 2;
    setResult({
      epley:   Math.round(ep * 10) / 10,
      brzycki: Math.round(br * 10) / 10,
      avg:     Math.round(avg * 10) / 10,
    });
  }

  function loadLast() {
    if (!lastSet) return;
    const w = Number(lastSet.weight_kg);
    const r = Number(lastSet.reps);
    setWeight(w);
    setReps(r);
    setLoadedFrom(t(lastSet.name_key, lastSet.exercise_slug));
    calculate(w, r);
  }

  function onCalc(e) {
    e.preventDefault();
    setLoadedFrom(null);
    calculate(weight, reps);
  }

  const zones = result ? [
    { key: 'calc.1rm.zone.max',      pctLow: 85, pctHigh: 100 },
    { key: 'calc.1rm.zone.hyper',    pctLow: 65, pctHigh: 85  },
    { key: 'calc.1rm.zone.endurance',pctLow: 50, pctHigh: 65  },
  ] : [];

  return (
    <div style={{
      background: 'var(--bg-elev)',
      border: '1px solid var(--border)',
      borderRadius: '0.6rem',
      padding: '0.8rem',
      margin: '0.8rem 0',
    }}>
      <h3 style={{ margin: '0 0 0.6rem', color: 'var(--accent-2)' }}>
        {t('calc.1rm.title', '1RM-Rechner')}
      </h3>

      {lastSet && (
        <button
          onClick={loadLast}
          style={{
            marginBottom: '0.6rem',
            width: '100%',
            background: 'var(--bg-card)',
            textAlign: 'left',
            fontSize: '0.88rem',
          }}
        >
          {t('calc.1rm.load_last', 'Letzten Satz laden')}
          <div className="muted" style={{ fontSize: '0.78rem', marginTop: 2 }}>
            {t(lastSet.name_key, lastSet.exercise_slug)}: {lastSet.reps} × {Number(lastSet.weight_kg)} kg
          </div>
        </button>
      )}

      <form className="grid-2" onSubmit={onCalc} style={{ gap: '0.5rem' }}>
        <label>
          <div className="muted" style={{ fontSize: '0.82rem' }}>
            {t('calc.1rm.weight', 'Gewicht (kg)')}
          </div>
          <input
            type="number" step="0.5" min="1"
            value={weight}
            onChange={e => { setWeight(e.target.value); setResult(null); setLoadedFrom(null); }}
          />
        </label>
        <label>
          <div className="muted" style={{ fontSize: '0.82rem' }}>
            {t('calc.1rm.reps', 'Wiederholungen')}
          </div>
          <input
            type="number" min="1" max="30"
            value={reps}
            onChange={e => { setReps(e.target.value); setResult(null); setLoadedFrom(null); }}
          />
        </label>
      </form>

      <button
        className="primary"
        onClick={onCalc}
        style={{ width: '100%', marginTop: '0.5rem' }}
      >
        {t('calc.1rm.calculate', 'Berechnen')}
      </button>

      {loadedFrom && (
        <div className="muted" style={{ fontSize: '0.78rem', marginTop: '0.4rem' }}>
          {t('calc.1rm.loaded_from', 'Übernommen von:')} {loadedFrom}
        </div>
      )}

      {result && (
        <div style={{ marginTop: '0.6rem' }}>
          <div className="grid-2" style={{ gap: '0.4rem', textAlign: 'center' }}>
            <div style={{ background: 'var(--bg-card)', borderRadius: '0.4rem', padding: '0.5rem' }}>
              <div className="muted" style={{ fontSize: '0.78rem' }}>
                {t('calc.1rm.result_epley', 'Epley')}
              </div>
              <strong style={{ fontSize: '1.3rem' }}>{result.epley} kg</strong>
            </div>
            <div style={{ background: 'var(--bg-card)', borderRadius: '0.4rem', padding: '0.5rem' }}>
              <div className="muted" style={{ fontSize: '0.78rem' }}>
                {t('calc.1rm.result_brzycki', 'Brzycki')}
              </div>
              <strong style={{ fontSize: '1.3rem' }}>{result.brzycki} kg</strong>
            </div>
          </div>
          <div style={{
            textAlign: 'center',
            marginTop: '0.4rem',
            padding: '0.4rem',
            background: 'var(--bg-card)',
            borderRadius: '0.4rem',
            border: '1px solid var(--accent)',
          }}>
            <div className="muted" style={{ fontSize: '0.78rem' }}>
              {t('calc.1rm.average', 'Durchschnitt')}
            </div>
            <strong style={{ fontSize: '1.6rem', color: 'var(--accent)' }}>
              ≈ {result.avg} kg
            </strong>
          </div>

          <div style={{ marginTop: '0.6rem' }}>
            <div className="muted" style={{ fontSize: '0.82rem', marginBottom: '0.3rem' }}>
              {t('calc.1rm.training_zones', 'Trainingszonen')}
            </div>
            {zones.map(z => {
              const lo = Math.round(result.avg * z.pctLow / 100 * 10) / 10;
              const hi = Math.round(result.avg * z.pctHigh / 100 * 10) / 10;
              const barWidth = `${z.pctHigh - z.pctLow}%`;
              const barLeft = `${z.pctLow - 50}%`;
              return (
                <div key={z.key} style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.3rem 0',
                  borderBottom: '1px solid var(--border)',
                  fontSize: '0.85rem',
                }}>
                  <span style={{ flex: 1 }}>{t(z.key, z.key)}</span>
                  <strong style={{ whiteSpace: 'nowrap' }}>
                    {lo} – {hi} kg
                  </strong>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
