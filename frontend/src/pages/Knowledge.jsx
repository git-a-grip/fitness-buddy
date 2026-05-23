import { useEffect, useState } from 'react';
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

  useEffect(() => {
    api.knowledge().then(setArticles);
  }, []);

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
    return (
      <>
        <header className="topbar">
          <button className="ghost" onClick={() => setOpen(null)} aria-label="Zurück">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          <h1>{t('nav.knowledge','Wissen')}</h1>
          <div style={{width: 22}} />
        </header>
        <main>
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
