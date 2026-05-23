import { useEffect, useMemo, useRef, useState } from 'react';
import { FrontBodySVG, BackBodySVG } from './MuscleSVG.jsx';
import { api } from '../api.js';
import { useT } from '../state/i18n.jsx';

// Farbverlauf grau → rot anhand Fatigue (0..1.5)
function fatigueColor(fat) {
  if (fat <= 0.05) return 'var(--muscle-gray)';
  // 0..1.5 → 0..1 normalisiert
  const t = Math.min(1, fat / 1.2);
  // grau (#3a4150) → tiefrot (#d94343)
  const g0 = [58, 65, 80];
  const g1 = [217, 67, 67];
  const c = g0.map((v, i) => Math.round(v + (g1[i] - v) * t));
  return `rgb(${c.join(',')})`;
}

export default function MuscleMap({ refreshKey }) {
  const { t, locale } = useT();
  const [state, setState]   = useState({});         // slug -> {fatigue, ...}
  const [muscles, setMuscles] = useState([]);       // catalog
  const [over, setOver] = useState([]);             // overtrained slugs
  const [tooltip, setTooltip] = useState(null);
  const ttRef = useRef(null);

  useEffect(() => {
    let cancel = false;
    Promise.all([api.muscles(), api.muscleState(), api.overtrained()]).then(([cat, st, ov]) => {
      if (cancel) return;
      setMuscles(cat);
      const map = {};
      for (const s of st) map[s.muscle_slug] = s;
      setState(map);
      setOver(ov.map(o => o.slug));
    }).catch(() => {});
    return () => { cancel = true; };
  }, [refreshKey]);

  const muscleBySlug = useMemo(() => {
    const m = {};
    for (const x of muscles) m[x.slug] = x;
    return m;
  }, [muscles]);

  const getFill   = (slug) => fatigueColor(state[slug]?.fatigue || 0);
  const getStroke = (slug) => over.includes(slug) ? 'var(--muscle-overtrained-stroke)' : undefined;

  const showTip = (slug, e) => {
    const m = muscleBySlug[slug];
    if (!m) return;
    const localName = t(m.name_key, slug);
    const s = state[slug];
    const fatigue = s ? Math.round(s.fatigue * 100) : 0;
    const recoveredAt = s?.recovered_at ? new Date(s.recovered_at) : null;
    setTooltip({
      x: e.clientX + 12, y: e.clientY + 12,
      slug, la: m.name_la, de: localName,
      fatigue, recoveredAt,
    });
  };
  const hideTip = () => setTooltip(null);

  return (
    <div className="card">
      <div className="row between">
        <h2>{t('home.title', 'Dein Körper')}</h2>
        <div className="muted" style={{fontSize: '0.78rem'}}>
          <span className="pill ok">{t('home.fresh', 'erholt')}</span>{' '}
          <span className="pill warn">{t('home.recovering', 'in Regeneration')}</span>{' '}
          <span className="pill danger">{t('home.fatigued', 'stark belastet')}</span>
        </div>
      </div>

      <div className="body-svg-wrap">
        <div>
          <h3>{t('home.front', 'Vorderseite')}</h3>
          <FrontBodySVG
            getFill={getFill}
            getStroke={getStroke}
            onMuscleEnter={showTip}
            onMuscleLeave={hideTip}
          />
        </div>
        <div>
          <h3>{t('home.back', 'Rückseite')}</h3>
          <BackBodySVG
            getFill={getFill}
            getStroke={getStroke}
            onMuscleEnter={showTip}
            onMuscleLeave={hideTip}
          />
        </div>
      </div>

      {tooltip && (
        <div ref={ttRef} className="tooltip" style={{ left: tooltip.x, top: tooltip.y }}>
          <div><strong>{tooltip.de}</strong></div>
          <div className="la">{tooltip.la}</div>
          <div className="muted" style={{marginTop: 4}}>
            {tooltip.fatigue > 0
              ? <>Belastung: <span className="kbd-num">{tooltip.fatigue}%</span></>
              : <>{t('home.fresh', 'erholt')}</>}
          </div>
          {tooltip.recoveredAt && tooltip.fatigue > 10 && (
            <div className="muted">
              erholt: {tooltip.recoveredAt.toLocaleString(locale === 'de' ? 'de-DE' : 'en-US', {
                day:'2-digit', month:'2-digit', hour:'2-digit', minute:'2-digit'
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
