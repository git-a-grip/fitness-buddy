import { useEffect, useRef, useState } from 'react';
import { api } from '../api.js';
import { useT } from '../state/i18n.jsx';
import { SVG_MAP } from '../components/KnowledgeSvg.jsx';

// Minimaler Markdown-Renderer: **bold**, Aufzählungen (-), Absätze, [[svg:xxx]]
function renderBody(text) {
  if (!text) return null;
  const parts = text.split(/\n\n+/);
  const out = [];
  for (let i = 0; i < parts.length; i++) {
    const p = parts[i].trim();
    if (!p) continue;
    const svgMatch = p.match(/^\[\[svg:([a-z_]+)\]\]$/);
    if (svgMatch) {
      const SVG = SVG_MAP[svgMatch[1]];
      out.push(SVG ? <SVG key={i} /> : null);
      continue;
    }
    if (p.startsWith('- ')) {
      const items = p.split('\n').filter(l => l.startsWith('- ')).map(l => l.slice(2));
      out.push(<ul key={i}>{items.map((li, k) => <li key={k}>{renderInline(li)}</li>)}</ul>);
      continue;
    }
    out.push(<p key={i}>{renderInline(p)}</p>);
  }
  return out;
}

function renderInline(t) {
  // **bold**
  const segs = [];
  let last = 0;
  const re = /\*\*([^*]+)\*\*/g;
  let m;
  let k = 0;
  while ((m = re.exec(t)) !== null) {
    if (m.index > last) segs.push(t.slice(last, m.index));
    segs.push(<strong key={k++}>{m[1]}</strong>);
    last = m.index + m[0].length;
  }
  if (last < t.length) segs.push(t.slice(last));
  return segs;
}

export default function KnowledgePage() {
  const { t } = useT();
  const [articles, setArticles] = useState([]);
  const [open, setOpen] = useState(null);
  const touchStartX = useRef(null);

  useEffect(() => {
    api.knowledge().then(setArticles);
  }, []);

  // Pfeiltasten-Navigation im Detailmodus
  useEffect(() => {
    if (!open) return;
    const idx = articles.findIndex(a => a.slug === open.slug);
    const onKey = (e) => {
      if (e.key === 'ArrowLeft'  && idx > 0)                       setOpen(articles[idx - 1]);
      if (e.key === 'ArrowRight' && idx >= 0 && idx < articles.length - 1) setOpen(articles[idx + 1]);
      if (e.key === 'Escape')                                       setOpen(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, articles]);

  function onTouchStart(e) { touchStartX.current = e.touches[0].clientX; }
  function onTouchEnd(e) {
    if (touchStartX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(dx) < 60) return;
    const idx = articles.findIndex(a => a.slug === open.slug);
    if (dx < 0 && idx >= 0 && idx < articles.length - 1) setOpen(articles[idx + 1]);
    if (dx > 0 && idx > 0)                               setOpen(articles[idx - 1]);
  }

  const byCat = articles.reduce((acc, a) => {
    (acc[a.category] ||= []).push(a);
    return acc;
  }, {});
  const catLabel = {
    metabolism: t('knowledge.cat.metabolism','Stoffwechsel & Energiesysteme'),
    recovery:   t('knowledge.cat.recovery',  'Regeneration & Anpassung'),
    basics:     t('knowledge.cat.basics',    'Grundlagen Krafttraining'),
  };

  if (open) {
    const body = t(open.body_key, '');
    const idx = articles.findIndex(a => a.slug === open.slug);
    const prev = idx > 0 ? articles[idx - 1] : null;
    const next = idx >= 0 && idx < articles.length - 1 ? articles[idx + 1] : null;
    return (
      <>
        <header className="topbar">
          <button className="ghost" onClick={() => setOpen(null)} aria-label="Zurück">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          <h1>{t('nav.knowledge','Wissen')}</h1>
          <div style={{width: 22}} />
        </header>
        <main onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
          <div className="grid-2" style={{gap:'0.5rem', marginBottom:'0.6rem'}}>
            <button className="ghost" disabled={!prev}
                    onClick={() => prev && setOpen(prev)}
                    style={{textAlign:'left', padding:'0.7rem 0.8rem', minHeight:64}}>
              {prev
                ? <div>
                    <div className="muted" style={{fontSize:'0.74rem', display:'flex', alignItems:'center', gap:4}}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
                      {t('knowledge.prev','vorheriger')}
                    </div>
                    <div style={{fontSize:'0.92rem', marginTop:2}}>{t(prev.title_key, prev.slug)}</div>
                  </div>
                : <div className="muted" style={{fontSize:'0.82rem'}}>—</div>
              }
            </button>
            <button className="ghost" disabled={!next}
                    onClick={() => next && setOpen(next)}
                    style={{textAlign:'right', padding:'0.7rem 0.8rem', minHeight:64}}>
              {next
                ? <div>
                    <div className="muted" style={{fontSize:'0.74rem', display:'flex', alignItems:'center', gap:4, justifyContent:'flex-end'}}>
                      {t('knowledge.next','nächster')}
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
                    </div>
                    <div style={{fontSize:'0.92rem', marginTop:2}}>{t(next.title_key, next.slug)}</div>
                  </div>
                : <div className="muted" style={{fontSize:'0.82rem'}}>—</div>
              }
            </button>
          </div>

          <article className="card knowledge-article">
            <h2>{t(open.title_key, open.slug)}</h2>
            {renderBody(body)}
          </article>
        </main>
      </>
    );
  }

  return (
    <>
      <header className="topbar">
        <h1>{t('knowledge.title','Sportmedizinisches Wissen')}</h1>
        <div />
      </header>
      <main>
        {['metabolism','recovery','basics'].map(cat => byCat[cat] && (
          <div className="card" key={cat}>
            <h2>{catLabel[cat]}</h2>
            <ul style={{listStyle:'none', padding:0, margin:0}}>
              {byCat[cat].map(a => (
                <li key={a.slug}
                    onClick={() => setOpen(a)}
                    style={{padding:'0.6rem 0', borderBottom:'1px solid var(--border)', cursor:'pointer'}}>
                  <div className="row between">
                    <span>{t(a.title_key, a.slug)}</span>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </main>
    </>
  );
}
