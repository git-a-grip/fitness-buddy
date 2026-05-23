import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MuscleMap from '../components/MuscleMap.jsx';
import IntakePanel from '../components/IntakePanel.jsx';
import { api } from '../api.js';
import { useT } from '../state/i18n.jsx';
import { useAuth } from '../state/auth.jsx';

export default function HomePage() {
  const { t } = useT();
  const { user, logout } = useAuth();
  const [active, setActive] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const nav = useNavigate();

  useEffect(() => {
    api.activeWorkout().then(setActive).catch(() => {});
    api.nextSuggestions(4).then(setSuggestions).catch(() => {});
  }, [refreshKey]);

  async function startWorkout() {
    await api.startWorkout();
    nav('/workout');
  }

  return (
    <>
      <header className="topbar">
        <h1>Fitness Buddy</h1>
        <button className="ghost" onClick={logout} title="Abmelden">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/></svg>
        </button>
      </header>
      <main>
        <p className="muted">Hallo {user?.display_name || user?.email}!</p>

        <MuscleMap refreshKey={refreshKey} />

        <div className="card">
          {active
            ? (
              <div className="row between">
                <div>
                  <h2>{t('home.active_workout','Laufendes Training')}</h2>
                  <div className="muted">{active.sets?.length || 0} Sätze geloggt</div>
                </div>
                <button className="primary" onClick={() => nav('/workout')}>Fortsetzen</button>
              </div>
            )
            : (
              <div className="stack">
                <h2>{t('home.suggest','Vorschlag: nächste Übung')}</h2>
                {suggestions.length === 0
                  ? <div className="muted">Keine Vorschläge – starte einfach.</div>
                  : (
                    <ul className="stack" style={{listStyle:'none', padding:0, margin:0}}>
                      {suggestions.map(s => (
                        <li key={s.id} className="row between" style={{padding: '0.5rem 0', borderBottom: '1px solid var(--border)'}}>
                          <div>
                            <strong>{t(s.name_key, s.slug)}</strong>
                            <div className="muted">→ {t('muscle.' + s.reason_muscle, s.reason_muscle)}</div>
                          </div>
                          <span className="pill">{s.category}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                <button className="primary" onClick={startWorkout}>{t('home.start_workout','Training starten')}</button>
              </div>
            )
          }
        </div>

        <IntakePanel />

        <button className="ghost" onClick={() => setRefreshKey(k => k+1)} style={{width:'100%'}}>
          Aktualisieren
        </button>
      </main>
    </>
  );
}
