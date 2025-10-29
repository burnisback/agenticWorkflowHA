import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './app/App';
import { QueryProvider } from './app/providers/QueryProvider';
import { ThemeProvider } from './app/providers/ThemeProvider';
import { I18nProvider } from './app/providers/I18nProvider';
import { AuthProviderStub } from './app/providers/AuthProviderStub';
import './styles/tailwind.css';

const root = document.getElementById('root')!;
ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <I18nProvider>
          <QueryProvider>
            <AuthProviderStub>
              <App />
            </AuthProviderStub>
          </QueryProvider>
        </I18nProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);