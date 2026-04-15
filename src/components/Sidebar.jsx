import React from 'react';
import { useTranslation } from 'react-i18next';
import { profile } from '../data/profile.js';

const FILES = [
  { id: 'welcome',  label: 'README.md',    icon: 'description', iconClass: 'text-primary' },
  { id: 'about',    label: 'about.md',     icon: 'info',        iconClass: 'text-primary' },
  { id: 'projects', label: 'projects.json',icon: 'data_object', iconClass: 'text-yellow-500' },
  { id: 'skills',   label: 'skills.ts',    icon: 'code',        iconClass: 'text-primary' },
  { id: 'education',label: 'education.yaml', icon: 'school',    iconClass: 'text-secondary' },
  { id: 'contact',  label: 'contact.html', icon: 'mail',        iconClass: 'text-orange-500' }
];

export default function Sidebar({ activeTabId, onOpenFile }) {
  const { t } = useTranslation();
  return (
    <aside className="flex h-full w-64 bg-surface-container-low shrink-0">
      <div className="w-12 bg-surface flex flex-col items-center py-4 space-y-4">
        <div className="p-2 bg-surface-container-high text-primary border-l-2 border-primary cursor-pointer">
          <span className="material-symbols-outlined">folder_open</span>
        </div>
        <div className="p-2 text-on-surface-variant opacity-70 hover:opacity-100 hover:bg-surface-container-high cursor-pointer">
          <span className="material-symbols-outlined">search</span>
        </div>
        <div className="p-2 text-on-surface-variant opacity-70 hover:opacity-100 hover:bg-surface-container-high cursor-pointer">
          <span className="material-symbols-outlined">account_tree</span>
        </div>
        <div className="mt-auto">
          <div className="p-2 text-on-surface-variant opacity-70 hover:opacity-100 hover:bg-surface-container-high cursor-pointer">
            <span className="material-symbols-outlined">account_circle</span>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col overflow-y-auto">
        <div className="px-4 py-3 flex items-center justify-between">
          <span className="font-label text-xs uppercase font-semibold tracking-widest text-primary">
            {t('sidebar.explorer').toUpperCase()}
          </span>
          <span className="material-symbols-outlined text-on-surface-variant text-sm">more_horiz</span>
        </div>

        <div className="mt-2">
          <div className="flex items-center px-4 py-1 gap-2 text-on-surface">
            <span className="material-symbols-outlined text-sm">expand_more</span>
            <span className="font-label text-sm">portfolio/</span>
          </div>
          <div className="flex items-center px-6 py-1 gap-2 text-on-surface">
            <span className="material-symbols-outlined text-sm">expand_more</span>
            <span className="font-label text-sm">src/</span>
          </div>

          {FILES.map((f) => {
            const active = activeTabId === f.id;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => onOpenFile(f.id)}
                className={
                  'w-full flex items-center px-8 py-1 gap-2 text-left transition-colors ' +
                  (active
                    ? 'bg-surface-container-high text-primary border-l-2 border-primary'
                    : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface')
                }
              >
                <span className={'material-symbols-outlined text-sm ' + (active ? 'text-primary' : f.iconClass)}>
                  {f.icon}
                </span>
                <span className="font-label text-sm">{f.label}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-auto p-4">
          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="block w-full text-center bg-primary text-on-primary py-1.5 rounded-md text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-opacity"
          >
            RESUME.PDF
          </a>
        </div>
      </div>
    </aside>
  );
}
