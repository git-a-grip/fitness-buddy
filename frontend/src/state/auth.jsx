import { createContext, useContext, useEffect, useState } from 'react';

const AuthCtx = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('fb_user');
    return raw ? JSON.parse(raw) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('fb_token'));

  useEffect(() => {
    if (token) localStorage.setItem('fb_token', token);
    else localStorage.removeItem('fb_token');
  }, [token]);

  useEffect(() => {
    if (user) localStorage.setItem('fb_user', JSON.stringify(user));
    else localStorage.removeItem('fb_user');
  }, [user]);

  const value = {
    user, token,
    login(u, t) { setUser(u); setToken(t); },
    logout()    { setUser(null); setToken(null); },
  };
  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

export function useAuth() {
  return useContext(AuthCtx);
}
