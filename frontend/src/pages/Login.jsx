import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../api.js';
import { useAuth } from '../state/auth.jsx';
import { useT } from '../state/i18n.jsx';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [busy, setBusy] = useState(false);
  const { login } = useAuth();
  const { t } = useT();
  const nav = useNavigate();

  async function submit(e) {
    e.preventDefault();
    setBusy(true); setError(null);
    try {
      const { token, user } = await api.login({ email, password });
      login(user, token);
      nav('/');
    } catch (err) {
      setError(err.message);
    } finally { setBusy(false); }
  }

  return (
    <main style={{maxWidth: 420}}>
      <h1>Fitness Buddy</h1>
      <p className="muted">{t('auth.login', 'Anmelden')}</p>
      <form className="stack" onSubmit={submit}>
        <input type="email" placeholder={t('auth.email','E-Mail')} required
          value={email} onChange={e => setEmail(e.target.value)} autoComplete="email" />
        <input type="password" placeholder={t('auth.password','Passwort')} required
          value={password} onChange={e => setPassword(e.target.value)} autoComplete="current-password" />
        {error && <div className="error">{error}</div>}
        <button type="submit" className="primary" disabled={busy}>
          {busy ? '…' : t('auth.login','Anmelden')}
        </button>
      </form>
      <p className="muted" style={{marginTop: '1rem'}}>
        {t('auth.no_account','Noch kein Konto?')} <Link to="/register">{t('auth.register','Registrieren')}</Link>
      </p>
    </main>
  );
}
