import { Routes, Route, Navigate, NavLink } from 'react-router-dom';
import { useAuth } from './state/auth.jsx';
import { useT } from './state/i18n.jsx';
import LoginPage from './pages/Login.jsx';
import RegisterPage from './pages/Register.jsx';
import HomePage from './pages/Home.jsx';
import WorkoutPage from './pages/Workout.jsx';
import StatsPage from './pages/Stats.jsx';
import KnowledgePage from './pages/Knowledge.jsx';
import SettingsPage from './pages/Settings.jsx';

function Tabbar() {
  const { t } = useT();
  const tab = (to, label, icon) => (
    <NavLink to={to} end className={({isActive}) => isActive ? 'active' : ''}>
      {icon}
      <span>{label}</span>
    </NavLink>
  );
  return (
    <nav className="tabbar">
      {tab('/', t('nav.home', 'Start'),
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 11l9-8 9 8v10a1 1 0 01-1 1h-5v-7H10v7H5a1 1 0 01-1-1z"/></svg>)}
      {tab('/workout', t('nav.workout', 'Training'),
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 12h2M20 12h2M6 8v8M18 8v8M9 6v12M15 6v12M11 11h2"/></svg>)}
      {tab('/stats', t('nav.stats', 'Statistik'),
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 20h18M6 16v-4M11 16v-8M16 16v-6M21 16v-2"/></svg>)}
      {tab('/knowledge', t('nav.knowledge', 'Wissen'),
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 5a2 2 0 012-2h11v18H6a2 2 0 01-2-2V5z"/><path d="M17 3h2v18h-2"/></svg>)}
      {tab('/settings', t('nav.settings', 'Einstellungen'),
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 00.3 1.8l.1.1a2 2 0 11-2.8 2.8l-.1-.1a1.7 1.7 0 00-1.8-.3 1.7 1.7 0 00-1 1.5V21a2 2 0 11-4 0v-.1a1.7 1.7 0 00-1-1.5 1.7 1.7 0 00-1.8.3l-.1.1a2 2 0 11-2.8-2.8l.1-.1a1.7 1.7 0 00.3-1.8 1.7 1.7 0 00-1.5-1H3a2 2 0 110-4h.1a1.7 1.7 0 001.5-1 1.7 1.7 0 00-.3-1.8l-.1-.1a2 2 0 112.8-2.8l.1.1a1.7 1.7 0 001.8.3H9a1.7 1.7 0 001-1.5V3a2 2 0 114 0v.1a1.7 1.7 0 001 1.5 1.7 1.7 0 001.8-.3l.1-.1a2 2 0 112.8 2.8l-.1.1a1.7 1.7 0 00-.3 1.8V9a1.7 1.7 0 001.5 1H21a2 2 0 110 4h-.1a1.7 1.7 0 00-1.5 1z"/></svg>)}
    </nav>
  );
}

export default function App() {
  const { token } = useAuth();
  const { loaded } = useT();

  if (!loaded) return <div style={{padding: '2rem', color: 'var(--text-dim)'}}>Lädt…</div>;

  if (!token) {
    return (
      <div className="app">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    );
  }

  return (
    <div className="app">
      <Routes>
        <Route path="/"           element={<HomePage />} />
        <Route path="/workout"    element={<WorkoutPage />} />
        <Route path="/stats"      element={<StatsPage />} />
        <Route path="/knowledge"  element={<KnowledgePage />} />
        <Route path="/settings"   element={<SettingsPage />} />
        <Route path="*"           element={<Navigate to="/" replace />} />
      </Routes>
      <Tabbar />
    </div>
  );
}
