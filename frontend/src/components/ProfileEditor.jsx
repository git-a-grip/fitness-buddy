import { useEffect, useState } from 'react';
import { api } from '../api.js';
import { useT } from '../state/i18n.jsx';
import { useAuth } from '../state/auth.jsx';

export default function ProfileEditor() {
  const { t } = useT();
  const { user, login, token } = useAuth();
  const [me, setMe] = useState(null);
  const [form, setForm] = useState(null);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    api.me().then(u => {
      setMe(u);
      setForm({
        display_name: u.display_name || '',
        weight_kg:    u.weight_kg ?? '',
        height_cm:    u.height_cm ?? '',
        birth_year:   u.birth_year ?? '',
        sex:          u.sex || 'm',
        // Bei Default-Werten: Feld leer lassen, sonst Wert zeigen
        body_fat_pct: u.body_fat_pct_source === 'user' ? u.body_fat_pct : '',
        muscle_pct:   u.muscle_pct_source   === 'user' ? u.muscle_pct   : '',
      });
    }).catch(e => setError(e.message));
  }, []);

  if (!form || !me) return <div className="muted">{t('common.loading','Lädt…')}</div>;

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  async function save(e) {
    e.preventDefault();
    setBusy(true); setError(null); setSaved(false);
    try {
      const payload = {
        display_name: form.display_name || null,
        weight_kg:    form.weight_kg    === '' ? null : Number(form.weight_kg),
        height_cm:    form.height_cm    === '' ? null : Number(form.height_cm),
        birth_year:   form.birth_year   === '' ? null : Number(form.birth_year),
        sex:          form.sex,
        body_fat_pct: form.body_fat_pct === '' ? null : Number(form.body_fat_pct),
        muscle_pct:   form.muscle_pct   === '' ? null : Number(form.muscle_pct),
      };
      const updated = await api.updateMe(payload);
      setMe(updated);
      // Auth-Context aktualisieren, damit der Header und kcal-Berechnung den neuen Wert nutzen
      login({ ...user, ...updated }, token);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (e) {
      setError(e.message);
    } finally { setBusy(false); }
  }

  return (
    <form className="stack" onSubmit={save}>
      <label>
        <div className="muted">{t('auth.display_name','Anzeigename')}</div>
        <input value={form.display_name} onChange={set('display_name')} />
      </label>
      <div className="grid-2">
        <label>
          <div className="muted">{t('auth.weight','Gewicht (kg)')}</div>
          <input type="number" step="0.1" value={form.weight_kg} onChange={set('weight_kg')} />
        </label>
        <label>
          <div className="muted">{t('auth.height','Größe (cm)')}</div>
          <input type="number" value={form.height_cm} onChange={set('height_cm')} />
        </label>
      </div>
      <div className="grid-2">
        <label>
          <div className="muted">{t('auth.birth_year','Geburtsjahr')}</div>
          <input type="number" value={form.birth_year} onChange={set('birth_year')} />
        </label>
        <label>
          <div className="muted">{t('auth.sex','Geschlecht')}</div>
          <select value={form.sex} onChange={set('sex')}>
            <option value="m">{t('auth.sex.m','männlich')}</option>
            <option value="f">{t('auth.sex.f','weiblich')}</option>
            <option value="d">{t('auth.sex.d','divers')}</option>
          </select>
        </label>
      </div>
      <div className="grid-2">
        <label>
          <div className="muted">{t('auth.body_fat','Körperfett (%)')}</div>
          <input type="number" step="0.1" min="0" max="100"
                 placeholder={me.body_fat_pct_source === 'default' ? `Standard: ${me.body_fat_pct}` : ''}
                 value={form.body_fat_pct} onChange={set('body_fat_pct')} />
        </label>
        <label>
          <div className="muted">{t('auth.muscle_pct','Muskelanteil (%)')}</div>
          <input type="number" step="0.1" min="0" max="100"
                 placeholder={me.muscle_pct_source === 'default' ? `Standard: ${me.muscle_pct}` : ''}
                 value={form.muscle_pct} onChange={set('muscle_pct')} />
        </label>
      </div>
      <p className="muted" style={{fontSize:'0.82rem'}}>
        {t('settings.composition_defaults','Standardwerte für Untrainierte werden verwendet, wenn leer gelassen.')}
      </p>
      {error && <div className="error">{error}</div>}
      {saved && <div className="success">✓ {t('settings.profile.saved','Gespeichert')}</div>}
      <button type="submit" className="primary" disabled={busy}>
        {busy ? '…' : t('common.save','Speichern')}
      </button>
    </form>
  );
}
