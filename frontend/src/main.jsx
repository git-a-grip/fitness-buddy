import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { AuthProvider } from './state/auth.jsx';
import { I18nProvider } from './state/i18n.jsx';
import './styles/global.css';
import { registerServiceWorker } from './lib/push.js';

registerServiceWorker();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <I18nProvider>
          <App />
        </I18nProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
