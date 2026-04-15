import React from 'react';
import { useTranslation } from 'react-i18next';
import { profile } from '../data/profile.js';

export default function AboutView() {
  const { t } = useTranslation();
  return (
    <div className="h-full overflow-auto p-8 font-mono text-sm leading-relaxed">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <span className="syntax-keyword text-2xl font-bold font-headline"># {t('about.title')}</span>
          <div className="h-1 w-16 bg-primary mt-2 rounded-full" />
        </div>

        <div className="syntax-comment mb-4">// {t('about.comment')}</div>

        <div className="space-y-1 mb-8">
          <div>
            <span className="syntax-keyword">const</span>{' '}
            <span className="syntax-function">{t('about.name')}</span>{' '}
            <span className="text-on-surface">=</span>{' '}
            <span className="syntax-string">"{profile.name}"</span>;
          </div>
          {profile.nickname && (
            <div>
              <span className="syntax-keyword">const</span>{' '}
              <span className="syntax-function">{t('about.alias')}</span>{' '}
              <span className="text-on-surface">=</span>{' '}
              <span className="syntax-string">"{profile.nickname}"</span>;
            </div>
          )}
          <div>
            <span className="syntax-keyword">const</span>{' '}
            <span className="syntax-function">{t('about.role')}</span>{' '}
            <span className="text-on-surface">=</span>{' '}
            <span className="syntax-string">"{profile.role}"</span>;
          </div>
        </div>

        <p className="text-on-surface leading-7 max-w-2xl">{profile.bio}</p>

        <div className="syntax-comment mt-8">
          // {t('about.try')}: <span className="syntax-function">skills</span> ·{' '}
          <span className="syntax-function">projects</span> ·{' '}
          <span className="syntax-function">contact</span>
        </div>
      </div>
    </div>
  );
}
