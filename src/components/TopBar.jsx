import React from 'react';
import { profile } from '../data/profile.js';

export default function TopBar({ tabs, activeTabId, onSelectTab }) {
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
      <div className="ml-auto flex items-center h-full px-4 gap-4">
        <a
          href={profile.github}
          target="_blank"
          rel="noreferrer"
          className="text-on-surface-variant hover:text-primary transition-colors"
          title="GitHub"
        >
          <span className="material-symbols-outlined">code</span>
        </a>
        <a
          href={`mailto:${profile.email}`}
          className="text-on-surface-variant hover:text-primary transition-colors"
          title="Email"
        >
          <span className="material-symbols-outlined">mail</span>
        </a>
      </div>
    </header>
  );
}
