import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../api.js';
import { useAuth } from '../state/auth.jsx';
import { useT } from '../state/i18n.jsx';

export default function RegisterPage() {
  const [form, setForm] = useState({
    email:'', password:'', display_name:'', weight_kg:'', height_cm:'', birth_year:'', sex:'m'
  });
  const [error, setError] = useState(null);
  const [busy, setBusy] = useState(false);
  const { login } = useAuth();
  const { t } = useT();
  const nav = useNavigate();

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  async function submit(e) {
    e.preventDefault();
    setBusy(true); setError(null);
    try {
      const payload = {
        ...form,
        weight_kg: form.weight_kg ? Number(form.weight_kg) : null,
        height_cm: form.height_cm ? Number(form.height_cm) : null,
        birth_year: form.birth_year ? Number(form.birth_year) : null,
      };
      const { token, user } = await api.register(payload);
      login(user, token);
      nav('/');
    } catch (err) {
      setError(err.message);
    } finally { setBusy(false); }
  }

  return (
    <main style={{maxWidth: 420}}>
      <h1>Fitness Buddy</h1>
      <p className="muted">{t('auth.register', 'Registrieren')}</p>
      <form className="stack" onSubmit={submit}>
        <input type="email" placeholder={t('auth.email','E-Mail')} required
          value={form.email} onChange={set('email')} autoComplete="email" />
        <input type="password" placeholder={t('auth.password','Passwort (min. 8)')} required minLength={8}
          value={form.password} onChange={set('password')} autoComplete="new-password" />
        <input type="text" placeholder={t('auth.display_name','Anzeigename')}
          value={form.display_name} onChange={set('display_name')} />
        <div className="grid-2">
          <input type="number" step="0.1" placeholder={t('auth.weight','Gewicht (kg)')}
            value={form.weight_kg} onChange={set('weight_kg')} />
          <input type="number" placeholder={t('auth.height','Größe (cm)')}
            value={form.height_cm} onChange={set('height_cm')} />
        </div>
        <div className="grid-2">
          <input type="number" placeholder={t('auth.birth_year','Geburtsjahr')}
            value={form.birth_year} onChange={set('birth_year')} />
          <select value={form.sex} onChange={set('sex')}>
            <option value="m">{t('auth.sex.m','männlich')}</option>
            <option value="f">{t('auth.sex.f','weiblich')}</option>
            <option value="d">{t('auth.sex.d','divers')}</option>
          </select>
        </div>
        {error && <div className="error">{error}</div>}
        <button type="submit" className="primary" disabled={busy}>
          {busy ? '…' : t('auth.register','Registrieren')}
        </button>
      </form>
      <p className="muted" style={{marginTop: '1rem'}}>
        {t('auth.have_account','Bereits ein Konto?')} <Link to="/login">{t('auth.login','Anmelden')}</Link>
      </p>
    </main>
  );
}
