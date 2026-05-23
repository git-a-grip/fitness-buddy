import { useEffect, useState } from 'react';
import { api } from '../api.js';
import { useT } from '../state/i18n.jsx';

export default function StatsPage() {
  const { t } = useT();
  const [days, setDays] = useState(30);
  const [sum, setSum] = useState(null);
  const [daily, setDaily] = useState([]);
  const [neglected, setNeglected] = useState([]);
  const [overtrained, setOvertrained] = useState([]);

  useEffect(() => {
    Promise.all([
      api.statsSummary(days),
      api.dailyKcal(days),
      api.neglected(),
      api.overtrained(),
    ]).then(([s, d, n, o]) => {
      setSum(s); setDaily(d); setNeglected(n); setOvertrained(o);
    });
  }, [days]);

  const maxKcal = Math.max(1, ...daily.map(d => Number(d.kcal)));
  const today = new Date();
  const dailyMap = Object.fromEntries(daily.map(d => [d.day, Number(d.kcal)]));
  const series = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today); d.setDate(today.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    series.push({ day: key, kcal: dailyMap[key] || 0 });
  }

  return (
    <>
      <header className="topbar">
        <h1>{t('stats.title','Statistik')}</h1>
        <select value={days} onChange={e => setDays(Number(e.target.value))} style={{width:'auto'}}>
          <option value={7}>{t('stats.last_7d','7 Tage')}</option>
          <option value={30}>{t('stats.last_30d','30 Tage')}</option>
          <option value={90}>90 Tage</option>
        </select>
      </header>
      <main>
        {sum && (
          <div className="card">
            <div className="grid-2">
              <div><h3>{t('stats.workouts','Trainings')}</h3><strong style={{fontSize:'1.6rem'}}>{sum.workouts}</strong></div>
              <div><h3>{t('stats.total_kcal','Verbrannte kcal')}</h3><strong style={{fontSize:'1.6rem'}}>{Number(sum.total_kcal).toFixed(0)}</strong></div>
            </div>
            <div className="grid-2" style={{marginTop:'0.6rem'}}>
              <div><h3>{t('stats.total_volume','Volumen (kg)')}</h3><strong>{Number(sum.total_volume_kg).toFixed(0)}</strong></div>
              <div><h3>Cardio</h3><strong>{Math.round((sum.total_cardio_s||0)/60)} min</strong></div>
            </div>
          </div>
        )}

        <div className="card">
          <h2>kcal pro Tag</h2>
          <div className="bar-chart">
            {series.map(d => (
              <div key={d.day}
                   className={'bar ' + (d.kcal === 0 ? 'dim' : '')}
                   style={{ height: `${(d.kcal / maxKcal) * 100}%` }}
                   title={`${d.day}: ${d.kcal.toFixed(0)} kcal`} />
            ))}
          </div>
          <div className="muted" style={{fontSize:'0.78rem', marginTop:'0.4rem'}}>max: {maxKcal.toFixed(0)} kcal</div>
        </div>

        <div className="card">
          <h2>{t('stats.neglected','Vernachlässigte Muskulatur')}</h2>
          <p className="muted" style={{fontSize:'0.88rem'}}>
            {t('stats.neglected_hint','Diese Muskelgruppen wurden in den letzten 14 Tagen nicht trainiert.')}
          </p>
          {neglected.length === 0
            ? <p className="success">Alles abgedeckt ✓</p>
            : (
              <ul style={{listStyle:'none', padding:0, margin:0}}>
                {neglected.map(m => (
                  <li key={m.id} style={{padding:'0.4rem 0', borderBottom:'1px solid var(--border)'}}>
                    <strong>{t(m.name_key, m.slug)}</strong>
                    <span className="pill" style={{marginLeft:'0.4rem'}}>{m.region}</span>
                  </li>
                ))}
              </ul>
            )}
        </div>

        {overtrained.length > 0 && (
          <div className="card">
            <h2>{t('stats.overtrained','Mehrfachbelastung')}</h2>
            <p className="muted" style={{fontSize:'0.88rem'}}>
              {t('stats.overtrained_hint','Diese Muskeln wurden mehrfach in kurzer Zeit belastet.')}
            </p>
            <ul style={{listStyle:'none', padding:0, margin:0}}>
              {overtrained.map(m => (
                <li key={m.slug} className="row between" style={{padding:'0.4rem 0'}}>
                  <strong>{t(m.name_key, m.slug)}</strong>
                  <span className="pill warn">{m.hits}× in 48h</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>
    </>
  );
}
