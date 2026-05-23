import { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../api.js';

const I18nCtx = createContext(null);

export function I18nProvider({ children }) {
  const [locale, setLocale] = useState(() => localStorage.getItem('fb_locale') || 'de');
  const [dict, setDict] = useState({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoaded(false);
    api.translations(locale).then(d => {
      if (!cancelled) { setDict(d); setLoaded(true); }
    }).catch(() => setLoaded(true));
    localStorage.setItem('fb_locale', locale);
    return () => { cancelled = true; };
  }, [locale]);

  const t = (key, fallback) => dict[key] || fallback || key;

  return (
    <I18nCtx.Provider value={{ locale, setLocale, t, loaded, dict }}>
      {children}
    </I18nCtx.Provider>
  );
}

export function useT() {
  return useContext(I18nCtx);
}
