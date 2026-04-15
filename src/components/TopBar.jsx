import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { profile } from '../data/profile.js';
import { LANGS, setLanguage } from '../i18n/index.js';
import { useTheme } from '../lib/theme.js';

export default function TopBar({ tabs, activeTabId, onSelectTab }) {
  const { t, i18n } = useTranslation();
  const { theme, toggle } = useTheme();
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef(null);

  useEffect(() => {
    function onClick(e) {
      if (langRef.current && !langRef.current.contains(e.target)) setLangOpen(false);
    }
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const currentLang = LANGS.find((l) => l.code === i18n.language) || LANGS[0];

  return (
    <header className="flex items-center w-full h-10 bg-surface shrink-0 z-50">
      <div className="flex items-center gap-4 px-4 h-full">
        <span className="text-primary font-bold tracking-tighter font-headline text-lg">
          Portfolio.dev
        </span>
        <div className="flex items-center h-full">
          {tabs.map((tab) => {
            const active = tab.id === activeTabId;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onSelectTab(tab.id)}
                className={
                  'px-4 py-2 font-headline text-sm tracking-tight transition-colors ' +
                  (active
                    ? 'text-primary border-t-2 border-primary bg-surface-container-lowest'
                    : 'text-on-surface-variant hover:text-on-surface bg-surface-container-low hover:bg-surface-container-high')
                }
              >
                {tab.title}
              </button>
            );
          })}
        </div>
      </div>
      <div className="ml-auto flex items-center h-full px-4 gap-3">
        <div ref={langRef} className="relative">
          <button
            type="button"
            onClick={() => setLangOpen((o) => !o)}
            className="flex items-center gap-1 px-2 py-1 rounded text-on-surface-variant hover:text-primary hover:bg-surface-container-high transition-colors text-xs font-medium"
            title={t('topbar.language')}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>language</span>
            <span>{currentLang.label}</span>
            <span className="material-symbols-outlined" style={{ fontSize: 14 }}>expand_more</span>
          </button>
          {langOpen && (
            <div className="absolute right-0 top-full mt-1 bg-surface-container border border-outline-variant rounded-md shadow-lg overflow-hidden min-w-[140px] z-50">
              {LANGS.map((l) => (
                <button
                  key={l.code}
                  type="button"
                  onClick={() => { setLanguage(l.code); setLangOpen(false); }}
                  className={
                    'w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-surface-container-high transition-colors ' +
                    (l.code === currentLang.code ? 'text-primary' : 'text-on-surface')
                  }
                >
                  <span>{l.name}</span>
                  <span className="syntax-comment text-[10px]">{l.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>
        <button
          type="button"
          onClick={toggle}
          className="text-on-surface-variant hover:text-primary transition-colors p-1 rounded hover:bg-surface-container-high"
          title={t('topbar.theme')}
        >
          <span className="material-symbols-outlined" style={{ fontSize: 18 }}>
            {theme === 'dark' ? 'light_mode' : 'dark_mode'}
          </span>
        </button>
        <a
          href={profile.github}
          target="_blank"
          rel="noreferrer"
          className="text-on-surface-variant hover:text-primary transition-colors"
          title={t('topbar.github')}
        >
          <span className="material-symbols-outlined">code</span>
        </a>
        <a
          href={`mailto:${profile.email}`}
          className="text-on-surface-variant hover:text-primary transition-colors"
          title={t('topbar.email')}
        >
          <span className="material-symbols-outlined">mail</span>
        </a>
      </div>
    </header>
  );
}
