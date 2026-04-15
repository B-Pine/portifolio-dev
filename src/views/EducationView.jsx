import React from 'react';
import { useTranslation } from 'react-i18next';
import { education, certifications, achievements } from '../data/education.js';

function Key({ children }) {
  return <span className="syntax-keyword">{children}</span>;
}
function Str({ children }) {
  return <span className="syntax-string">"{children}"</span>;
}
function Dash() {
  return <span className="text-on-surface-variant">- </span>;
}

export default function EducationView() {
  const { t } = useTranslation();
  return (
    <div className="h-full overflow-auto p-8 font-mono text-sm leading-relaxed">
      <div className="max-w-3xl mx-auto pb-12">
        <div className="mb-2 syntax-comment text-xs">// src / data / education.js</div>
        <div className="mb-6">
          <span className="syntax-keyword text-2xl font-bold font-headline"># {t('education.title')}</span>
          <div className="h-1 w-16 bg-primary mt-2 rounded-full" />
        </div>

        {/* Education section */}
        <section className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <span className="material-symbols-outlined text-primary" style={{ fontSize: 18 }}>school</span>
            <Key>{t('education.education')}</Key>
            <span className="text-on-surface-variant">:</span>
            <span className="syntax-comment text-[11px] ml-1">({education.length})</span>
          </div>

          <div className="pl-4 space-y-5">
            {education.map((e, i) => (
              <div key={i} className="relative pl-5 border-l border-outline-variant/40">
                <span className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-primary ring-4 ring-surface" />

                <div className="space-y-0.5">
                  <div><Dash /><Key>{t('education.fields.institution')}</Key>: <Str>{e.institution}</Str></div>
                  <div className="pl-4"><Key>{t('education.fields.program')}</Key>:     <Str>{e.program}</Str></div>
                  {e.location && (
                    <div className="pl-4"><Key>{t('education.fields.location')}</Key>:    <Str>{e.location}</Str></div>
                  )}
                  <div className="pl-4">
                    <Key>{t('education.fields.period')}</Key>:      <Str>{e.start} → {e.end || t('education.fields.present')}</Str>
                    {e.status === 'ongoing' && (
                      <span className="ml-2 text-[10px] uppercase tracking-wider bg-secondary/20 text-secondary px-2 py-0.5 rounded">
                        {t('education.ongoing')}
                      </span>
                    )}
                    {e.status === 'completed' && (
                      <span className="ml-2 text-[10px] uppercase tracking-wider bg-tertiary/20 text-tertiary px-2 py-0.5 rounded">
                        {t('education.completed')}
                      </span>
                    )}
                  </div>
                  {e.note && (
                    <div className="pl-4 syntax-comment"># {e.note}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Certifications section */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <span className="material-symbols-outlined text-secondary" style={{ fontSize: 18 }}>verified</span>
            <Key>{t('education.certifications')}</Key>
            <span className="text-on-surface-variant">:</span>
            <span className="syntax-comment text-[11px] ml-1">({certifications.length})</span>
          </div>

          <div className="pl-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            {certifications.map((c, i) => {
              const body = (
                <div className="h-full flex flex-col bg-surface-container hover:bg-surface-container-high transition-colors rounded-lg p-4">
                  <div className="flex items-start justify-between gap-3 mb-1">
                    <div className="flex-1 min-w-0">
                      <Dash /><Key>{t('education.fields.name')}</Key>: <Str>{c.name}</Str>
                    </div>
                    {c.year && (
                      <span className="text-[10px] uppercase tracking-wider bg-surface-container-lowest text-on-surface-variant px-2 py-0.5 rounded shrink-0">
                        {c.year}
                      </span>
                    )}
                  </div>
                  <div className="pl-4 flex items-center gap-2">
                    <span><Key>{t('education.fields.issuer')}</Key>: <Str>{c.issuer}</Str></span>
                    {c.ongoing && (
                      <span className="text-[10px] uppercase tracking-wider bg-secondary/20 text-secondary px-2 py-0.5 rounded">
                        {t('education.ongoing')}
                      </span>
                    )}
                  </div>
                  {c.completed && (
                    <div className="pl-4"><Key>{t('education.fields.completedField')}</Key>: <Str>{c.completed}</Str></div>
                  )}
                  {c.issued && (
                    <div className="pl-4"><Key>{t('education.fields.issued')}</Key>:    <Str>{c.issued}</Str></div>
                  )}
                  {c.url && (
                    <div className="pl-4 mt-1 flex items-center gap-1 text-primary text-[11px]">
                      <span className="material-symbols-outlined" style={{ fontSize: 12 }}>open_in_new</span>
                      {t('education.verify')}
                    </div>
                  )}
                  {c.note && (
                    <div className="pl-4 syntax-comment text-[11px] mt-1"># {c.note}</div>
                  )}
                </div>
              );
              return c.url ? (
                <a key={i} href={c.url} target="_blank" rel="noreferrer" className="block h-full">
                  {body}
                </a>
              ) : (
                <div key={i} className="h-full">{body}</div>
              );
            })}
          </div>
        </section>

        {/* Achievements section */}
        <section className="mt-10">
          <div className="flex items-center gap-2 mb-4">
            <span className="material-symbols-outlined text-tertiary" style={{ fontSize: 18 }}>emoji_events</span>
            <Key>{t('education.achievements')}</Key>
            <span className="text-on-surface-variant">:</span>
            <span className="syntax-comment text-[11px] ml-1">({achievements.length})</span>
          </div>

          <div className="pl-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            {achievements.map((a, i) => {
              const body = (
                <div className="h-full flex flex-col bg-surface-container hover:bg-surface-container-high transition-colors rounded-lg p-4 border-l-2 border-tertiary">
                  <div className="flex items-start justify-between gap-3 mb-1">
                    <div className="flex-1 min-w-0">
                      <Dash /><Key>{t('education.fields.name')}</Key>: <Str>{a.name}</Str>
                    </div>
                    {a.year && (
                      <span className="text-[10px] uppercase tracking-wider bg-surface-container-lowest text-on-surface-variant px-2 py-0.5 rounded shrink-0">
                        {a.year}
                      </span>
                    )}
                  </div>
                  {a.event && (
                    <div className="pl-4"><Key>{t('education.fields.event')}</Key>:     <Str>{a.event}</Str></div>
                  )}
                  {a.placement && (
                    <div className="pl-4"><Key>{t('education.fields.placement')}</Key>: <Str>{a.placement}</Str></div>
                  )}
                  {a.date && (
                    <div className="pl-4"><Key>{t('education.fields.date')}</Key>:      <Str>{a.date}</Str></div>
                  )}
                  {a.url && (
                    <div className="pl-4 mt-1 flex items-center gap-1 text-primary text-[11px]">
                      <span className="material-symbols-outlined" style={{ fontSize: 12 }}>open_in_new</span>
                      {t('education.view')}
                    </div>
                  )}
                  {a.note && (
                    <div className="pl-4 syntax-comment text-[11px] mt-1"># {a.note}</div>
                  )}
                </div>
              );
              return a.url ? (
                <a key={i} href={a.url} target="_blank" rel="noreferrer" className="block h-full">
                  {body}
                </a>
              ) : (
                <div key={i} className="h-full">{body}</div>
              );
            })}
          </div>
        </section>

      </div>
    </div>
  );
}
