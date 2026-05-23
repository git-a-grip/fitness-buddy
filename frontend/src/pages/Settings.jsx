import { useEffect, useState } from 'react';
import { api } from '../api.js';
import { useT } from '../state/i18n.jsx';
import { useAuth } from '../state/auth.jsx';
import { enablePushNotifications, pushPermissionState } from '../lib/push.js';

export default function SettingsPage() {
  const { t, locale, setLocale } = useT();
  const { user, logout } = useAuth();
  const [packages, setPackages] = useState([]);
  const [pushState, setPushState] = useState('default');
  const [pushBusy, setPushBusy]   = useState(false);

  useEffect(() => {
    api.packages().then(setPackages);
    pushPermissionState().then(setPushState);
  }, []);

  async function enablePush() {
    setPushBusy(true);
    const r = await enablePushNotifications();
    if (r.ok) setPushState('granted');
    else if (r.reason === 'denied') setPushState('denied');
    setPushBusy(false);
  }

  async function testPush() {
    await api.pushTest();
  }

  async function toggle(pkg) {
    if (pkg.installed) await api.uninstallPkg(pkg.id);
    else                await api.installPkg(pkg.id);
    setPackages(await api.packages());
  }

  return (
    <>
      <header className="topbar">
        <h1>{t('settings.title','Einstellungen')}</h1>
        <div />
      </header>
      <main>
        <div className="card">
          <h2>{t('settings.profile','Profil')}</h2>
          <p className="muted">{user?.email}</p>
          <p className="muted">Gewicht: {user?.weight_kg || '–'} kg</p>
          <button onClick={logout}>{t('nav.logout','Abmelden')}</button>
        </div>

        <div className="card">
          <h2>Push-Benachrichtigungen</h2>
          {pushState === 'granted'
            ? (
              <div className="stack">
                <p className="success">✓ {t('phase2.push.enabled','Erinnerungen aktiv')}</p>
                <button onClick={testPush}>Test-Benachrichtigung senden</button>
              </div>
            )
            : pushState === 'denied'
              ? <p className="error">{t('phase2.push.denied','Im Browser blockiert.')}</p>
              : (
                <button className="primary" disabled={pushBusy} onClick={enablePush}>
                  {pushBusy ? '…' : t('phase2.push.enable','Push-Erinnerungen aktivieren')}
                </button>
              )
          }
        </div>

        <div className="card">
          <h2>{t('settings.language','Sprache')}</h2>
          <select value={locale} onChange={e => setLocale(e.target.value)} style={{maxWidth: 240}}>
            <option value="de">Deutsch</option>
            <option value="en">English (in Vorbereitung)</option>
            <option value="es">Español (in Vorbereitung)</option>
          </select>
        </div>

        <div className="card">
          <h2>{t('settings.packages','Geräte-Pakete')}</h2>
          <ul style={{listStyle:'none', padding:0, margin:0}}>
            {packages.map(p => (
              <li key={p.id} className="row between" style={{padding:'0.6rem 0', borderBottom:'1px solid var(--border)'}}>
                <div>
                  <strong>{t(p.name_key, p.slug)}</strong>
                  <div className="muted" style={{fontSize:'0.85rem'}}>
                    {p.manufacturer_name || '–'} · {p.exercise_count} Übungen
                  </div>
                </div>
                <button className={p.installed ? '' : 'primary'} onClick={() => toggle(p)}>
                  {p.installed ? t('settings.uninstall','deinstallieren') : t('settings.install','installieren')}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </>
  );
}
