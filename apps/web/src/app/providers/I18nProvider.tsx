import React, { useEffect } from 'react';
import i18n from 'i18next';
import { I18nextProvider } from 'react-i18next';

// basic i18n initialisation with an English namespace.  Additional locales can be loaded in
// future features.
i18n.init({
  lng: 'en',
  fallbackLng: 'en',
  resources: {
    en: {
      translation: {}
    }
  }
});

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    // no-op to ensure i18n is initialised
  }, []);
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
};