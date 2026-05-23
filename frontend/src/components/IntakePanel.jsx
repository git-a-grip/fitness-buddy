import { useEffect, useState } from 'react';
import { api } from '../api.js';
import { useT } from '../state/i18n.jsx';

const KINDS = [
  { kind: 'protein_shake', label_key: 'phase2.intake.protein_shake', defaultAmount: 30, unit: 'g' },
  { kind: 'creatine',      label_key: 'phase2.intake.creatine',      defaultAmount: 5,  unit: 'g' },
  { kind: 'water',         label_key: 'phase2.intake.water',         defaultAmount: 500,unit: 'ml' },
];

export default function IntakePanel() {
  const { t } = useT();
  const [items, setItems] = useState([]);
  const [summary, setSummary] = useState([]);

  async function load() {
    setItems(await api.intakes(14));
    setSummary(await api.intakeSummary(30));
  }

  useEffect(() => { load(); }, []);

  async function add(k) {
    await api.addIntake({ kind: k.kind, amount: k.defaultAmount, unit: k.unit });
    load();
  }

  async function del(id) {
    await api.deleteIntake(id);
    load();
  }

  return (
    <div className="card">
      <h2>{t('phase2.intake.title','Einnahmen')}</h2>
      <div className="row" style={{flexWrap:'wrap', gap:'0.4rem'}}>
        {KINDS.map(k => (
          <button key={k.kind} onClick={() => add(k)}>
            + {t(k.label_key, k.kind)}
          </button>
        ))}
      </div>

      {summary.length > 0 && (
        <div className="grid-2" style={{marginTop:'0.6rem'}}>
          {summary.map(s => (
            <div key={s.kind} className="muted" style={{fontSize:'0.88rem'}}>
              {t('phase2.intake.' + s.kind, s.kind)}:
              <strong style={{color:'var(--text)', marginLeft:6}}>{s.count}× (30d)</strong>
            </div>
          ))}
        </div>
      )}

      {items.length > 0 && (
        <ul style={{listStyle:'none', padding:0, margin:'0.6rem 0 0', maxHeight: 180, overflowY:'auto'}}>
          {items.slice(0, 12).map(i => (
            <li key={i.id} className="row between" style={{padding:'0.3rem 0', borderBottom:'1px solid var(--border)'}}>
              <span style={{fontSize:'0.88rem'}}>
                {t('phase2.intake.' + i.kind, i.kind)}
                {i.amount ? ` · ${Number(i.amount)}${i.unit || ''}` : ''}
              </span>
              <span className="muted" style={{fontSize:'0.78rem'}}>
                {new Date(i.taken_at).toLocaleString('de-DE', { day:'2-digit', month:'2-digit', hour:'2-digit', minute:'2-digit' })}
                <button className="ghost" style={{padding:'2px 6px', marginLeft:6, minHeight: 'auto'}} onClick={() => del(i.id)}>×</button>
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
