import { useT } from '../state/i18n.jsx';

// Die 5 wichtigsten Haltungs-/Technik-Tipps. Bilder liegen in public/haltung/.
const TIPS = [
  {
    img: '/haltung/tip1.png',
    titleKey: 'posture.tip1.title', title: 'Neutrale Wirbelsäule',
    bodyKey:  'posture.tip1.body',
    body: 'Halte den Rücken über die gesamte Bewegung gerade – weder rund noch ins Hohlkreuz. Die Kraft kommt aus der Hüfte (Hip Hinge), nicht aus dem unteren Rücken. Besonders wichtig bei Kreuzheben, Kniebeuge und Rudern.',
    cueKey:   'posture.tip1.cue',
    cue: 'Brust raus, Blick nach vorn-unten, Hüfte nach hinten schieben.',
  },
  {
    img: '/haltung/tip2.png',
    titleKey: 'posture.tip2.title', title: 'Rumpf anspannen',
    bodyKey:  'posture.tip2.body',
    body: 'Spanne vor jedem schweren Satz bewusst Bauch- und Rumpfmuskulatur an, als würdest du einen Schlag erwarten. Diese „Bracing"-Spannung stabilisiert die Wirbelsäule und überträgt deine Kraft effizienter ins Gewicht.',
    cueKey:   'posture.tip2.cue',
    cue: 'Tief in den Bauch einatmen, Bauch fest machen, dann erst heben.',
  },
  {
    img: '/haltung/tip3.png',
    titleKey: 'posture.tip3.title', title: 'Schulterblätter zurück & unten',
    bodyKey:  'posture.tip3.body',
    body: 'Ziehe die Schulterblätter zusammen und nach unten, die Brust hebt sich. So sitzt die Schulter sicher im Gelenk – entscheidend bei Bankdrücken, Rudern und Überkopfdrücken und schützt vor Schulterverletzungen.',
    cueKey:   'posture.tip3.cue',
    cue: 'Schulterblätter „in die Gesäßtaschen" ziehen, Brust raus.',
  },
  {
    img: '/haltung/tip4.png',
    titleKey: 'posture.tip4.title', title: 'Knie folgen den Zehen',
    bodyKey:  'posture.tip4.body',
    body: 'Lass die Knie in Richtung der Fußspitzen wandern – niemals nach innen einknicken. Bei Kniebeuge und Ausfallschritt sorgt das für eine gesunde Belastung von Knie und Hüfte.',
    cueKey:   'posture.tip4.cue',
    cue: 'Knie aktiv nach außen drücken, Füße fest am Boden verwurzeln.',
  },
  {
    img: '/haltung/tip5.png',
    titleKey: 'posture.tip5.title', title: 'Kontrolliert bewegen & ausatmen',
    bodyKey:  'posture.tip5.body',
    body: 'Bewege das Gewicht langsam und kontrolliert, vor allem beim Absenken (exzentrische Phase). Atme bei der Anstrengung aus, beim Zurückführen ein. Kontrolle bringt mehr Trainingsreiz als Schwung.',
    cueKey:   'posture.tip5.cue',
    cue: '2 Sekunden heben, 3 Sekunden senken, beim Drücken ausatmen.',
  },
];

export default function HaltungPage() {
  const { t } = useT();

  return (
    <>
      <header className="topbar">
        <h1>{t('nav.posture', 'Haltung')}</h1>
      </header>
      <main>
        <p className="muted" style={{ marginTop: 0, marginBottom: '1rem' }}>
          {t('posture.intro',
            'Die fünf wichtigsten Technik-Grundlagen für sicheres, effektives Krafttraining. Verinnerliche sie – sie gelten für fast jede Übung.')}
        </p>

        <div className="stack" style={{ gap: '1rem' }}>
          {TIPS.map((tip, i) => (
            <div key={i} className="card" style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{ position: 'relative' }}>
                <span style={{
                  position: 'absolute', top: 8, left: 8,
                  width: 28, height: 28, borderRadius: '50%',
                  background: 'var(--accent)', color: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 800, fontSize: '0.95rem',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
                }}>{i + 1}</span>
                <img
                  src={tip.img}
                  alt={t(tip.titleKey, tip.title)}
                  loading="lazy"
                  style={{ width: '100%', display: 'block', aspectRatio: '1 / 1', objectFit: 'cover' }}
                />
              </div>
              <div style={{ padding: '0.9rem 1rem 1rem' }}>
                <h2 style={{ margin: '0 0 0.4rem', fontSize: '1.1rem', color: 'var(--accent-2)' }}>
                  {t(tip.titleKey, tip.title)}
                </h2>
                <p style={{ margin: '0 0 0.7rem', lineHeight: 1.5 }}>
                  {t(tip.bodyKey, tip.body)}
                </p>
                <div className="row" style={{ gap: '0.5rem', alignItems: 'flex-start' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                       stroke="var(--accent-2)" strokeWidth="2" style={{ flexShrink: 0, marginTop: 2 }}>
                    <path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                  </svg>
                  <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>
                    {t(tip.cueKey, tip.cue)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
