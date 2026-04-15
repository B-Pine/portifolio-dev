import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en.json';
import fr from './fr.json';
import rw from './rw.json';

const stored = typeof window !== 'undefined' ? localStorage.getItem('lang') : null;

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    fr: { translation: fr },
    rw: { translation: rw }
  },
  lng: stored || 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false }
});

export const LANGS = [
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'fr', label: 'FR', name: 'Français' },
  { code: 'rw', label: 'RW', name: 'Kinyarwanda' }
];

export function setLanguage(code) {
  i18n.changeLanguage(code);
  if (typeof window !== 'undefined') localStorage.setItem('lang', code);
}

export default i18n;
