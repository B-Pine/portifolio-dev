import React from 'react';
import { useTranslation } from 'react-i18next';
import { profile } from '../data/profile.js';

export default function EmptyEditor() {
  const { t } = useTranslation();
  return (
    <div className="h-full w-full flex flex-col items-center justify-center text-center px-8 select-none">
      <span
        className="material-symbols-outlined text-primary/80"
        style={{ fontSize: 200, fontVariationSettings: "'FILL' 0, 'wght' 200" }}
      >
        terminal
      </span>

      <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight mt-6">
        {profile.name}
      </h1>
      {profile.nickname && (
        <div className="syntax-comment font-mono text-xs mt-2">
          // {t('welcome.akA')} <span className="syntax-function">"{profile.nickname}"</span>
        </div>
      )}

      <div className="flex items-center gap-3 mt-3 text-on-surface-variant font-mono text-sm">
        <span className="h-px w-8 bg-outline-variant" />
        <span className="uppercase tracking-[0.3em] text-xs">portfolio</span>
        <span className="h-px w-8 bg-outline-variant" />
      </div>

      <p className="syntax-comment font-mono text-xs mt-10">
        // {t('welcome.typeHelp')} <span className="syntax-function">help</span> {t('welcome.toGetStarted')}
      </p>
    </div>
  );
}
