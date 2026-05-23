import { useEffect, useState } from 'react';
import { api } from '../api.js';
import { useT } from '../state/i18n.jsx';

export default function StretchProgram({ workoutId, onDone, onSkip }) {
  const { t } = useT();
  const [stretches, setStretches] = useState([]);
  const [active, setActive] = useState(0);
  const [secsLeft, setSecsLeft] = useState(0);
  const [running, setRunning] = useState(false);
  const [startedAt] = useState(() => Date.now());

  useEffect(() => {
    api.stretchSuggest().then(s => {
      setStretches(s);
      if (s.length) setSecsLeft(s[0].hold_seconds);
    });
  }, []);

  useEffect(() => {
    if (!running) return;
    if (secsLeft <= 0) {
      // Nächste Übung
      const nextIdx = active + 1;
      if (nextIdx < stretches.length) {
        setActive(nextIdx);
        setSecsLeft(stretches[nextIdx].hold_seconds);
      } else {
        setRunning(false);
      }
      return;
    }
    const id = setTimeout(() => setSecsLeft(s => s - 1), 1000);
    return () => clearTimeout(id);
  }, [running, secsLeft, active, stretches]);

  async function finish() {
    const dur = Math.round((Date.now() - startedAt) / 1000);
    if (workoutId) await api.stretchDone(workoutId, dur).catch(() => {});
    onDone && onDone();
  }

  if (stretches.length === 0) {
    return (
      <div className="card">
        <h2>{t('phase2.stretch.title','Cooldown – Dehnprogramm')}</h2>
        <p className="muted">Lade Empfehlungen…</p>
      </div>
    );
  }
  const cur = stretches[active];

  return (
    <div className="card">
      <h2>{t('phase2.stretch.title','Cooldown – Dehnprogramm')}</h2>
      <p className="muted">{t('phase2.stretch.intro','Diese Dehnübungen helfen deiner Regeneration.')}</p>

      <div className="row between" style={{margin:'1rem 0 0.5rem'}}>
        <span className="muted">{active + 1} / {stretches.length}</span>
        <span className="pill">{cur.each_side ? 'beide Seiten' : ''}</span>
      </div>
      <h1 style={{fontSize:'1.4rem', margin: '0.4rem 0'}}>
        {t(cur.stretch_key, cur.stretch_key)}
      </h1>
      <p className="muted">→ {t('muscle.' + cur.muscle_slug, cur.muscle_slug)}</p>

      <div style={{textAlign:'center', margin: '1rem 0', fontSize:'3rem', fontWeight: 700, color: 'var(--accent-2)'}}>
        {secsLeft}s
      </div>

      <div className="row" style={{gap: '0.5rem'}}>
        {!running
          ? <button className="primary" style={{flex: 1}} onClick={() => setRunning(true)}>Start</button>
          : <button style={{flex: 1}} onClick={() => setRunning(false)}>Pause</button>
        }
        <button onClick={() => {
          const nextIdx = active + 1;
          if (nextIdx < stretches.length) {
            setActive(nextIdx);
            setSecsLeft(stretches[nextIdx].hold_seconds);
          } else { setRunning(false); }
        }}>→</button>
      </div>

      <div className="row between" style={{marginTop:'1rem'}}>
        <button className="ghost" onClick={onSkip}>{t('phase2.stretch.skip','Überspringen')}</button>
        <button className="primary" onClick={finish}>{t('phase2.stretch.done','Erledigt')}</button>
      </div>
    </div>
  );
}
