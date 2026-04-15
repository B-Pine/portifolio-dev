import React from 'react';
import { profile } from '../data/profile.js';

export default function MobileFallback({ onContinue }) {
  return (
    <div className="h-full flex flex-col items-center justify-center p-8 text-center">
      <span className="material-symbols-outlined text-primary" style={{ fontSize: 48 }}>
        desktop_windows
      </span>
      <h1 className="font-headline text-2xl font-bold mt-4 text-primary">Portfolio.dev</h1>
      <p className="text-on-surface-variant text-sm mt-2 max-w-xs">
        This portfolio is designed for a wider screen. For the full IDE experience, open it on a
        desktop or tablet in landscape.
      </p>

      <div className="mt-6 bg-surface-container rounded-xl p-5 text-left text-sm space-y-2 w-full max-w-xs">
        <div className="font-bold text-primary">{profile.name}</div>
        <div className="text-on-surface-variant text-xs">{profile.role}</div>
        <p className="text-xs leading-relaxed pt-2">{profile.bio}</p>
        <div className="pt-3 space-y-1.5">
          <a href={`mailto:${profile.email}`} className="block text-xs text-primary break-all">
            {profile.email}
          </a>
          <a href={profile.github} target="_blank" rel="noreferrer" className="block text-xs text-primary break-all">
            {profile.github}
          </a>
        </div>
      </div>

      <button
        type="button"
        onClick={onContinue}
        className="mt-6 text-xs uppercase tracking-wider text-on-surface-variant hover:text-primary"
      >
        continue anyway →
      </button>
    </div>
  );
}
