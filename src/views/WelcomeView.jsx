import React from 'react';
import { profile } from '../data/profile.js';
import projects from '../data/projects.json';
import { certifications, achievements } from '../data/education.js';

export default function WelcomeView() {
  return (
    <div className="relative h-full overflow-auto p-8 font-mono text-sm leading-relaxed">
      <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
        <span className="material-symbols-outlined" style={{ fontSize: 300 }}>terminal</span>
      </div>
      <div className="max-w-3xl mx-auto relative pb-8">
        <div className="flex items-center gap-5 mb-8">
          {profile.avatarUrl && (
            <img
              src={profile.avatarUrl}
              alt={profile.name}
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
              className="w-20 h-20 rounded-xl object-cover bg-surface-container ring-2 ring-primary/30 shrink-0"
            />
          )}
          <div>
            <span className="syntax-keyword text-2xl font-bold font-headline">
              # {profile.name}
              {profile.nickname && (
                <span className="text-on-surface-variant font-normal text-base ml-2">
                  aka <span className="syntax-function">"{profile.nickname}"</span>
                </span>
              )}
            </span>
            <div className="h-1 w-24 bg-primary mt-2 rounded-full" />
            <div className="syntax-comment text-xs mt-2">// {profile.role}</div>
          </div>
        </div>

        <p className="syntax-comment mb-6">
          // type <span className="syntax-function">help</span> in the terminal below to get started.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
          <div className="bg-surface-container p-6 rounded-xl group hover:bg-surface-container-high transition-colors">
            <div className="flex items-center gap-3 mb-4">
              <span className="material-symbols-outlined text-primary">developer_mode</span>
              <h3 className="font-headline font-bold text-lg">Backend Logic</h3>
            </div>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Building scalable systems with Django, Node, and SQL. Reliability and clarity over
              cleverness.
            </p>
          </div>
          <div className="bg-surface-container p-6 rounded-xl group hover:bg-surface-container-high transition-colors">
            <div className="flex items-center gap-3 mb-4">
              <span className="material-symbols-outlined text-secondary">palette</span>
              <h3 className="font-headline font-bold text-lg">Interactive Frontends</h3>
            </div>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              React + Tailwind interfaces that feel like real tools — not templates.
            </p>
          </div>
        </div>

        <div className="mt-12 bg-surface-container-low rounded-xl p-6">
          <h4 className="text-xs uppercase tracking-widest text-primary mb-4 font-bold">
            Featured Projects
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {projects.slice(0, 3).map((p) => (
              <div
                key={p.slug}
                className="aspect-video bg-surface-container-lowest rounded p-3 flex flex-col justify-end hover:bg-surface-container-high transition-colors"
              >
                <div className="text-[10px] font-bold text-primary">{p.name}</div>
                <div className="text-[10px] text-on-surface-variant truncate">{p.tagline}</div>
              </div>
            ))}
          </div>
          <div className="syntax-comment text-xs mt-3">
            // try: <span className="syntax-function">projects</span> ·{' '}
            <span className="syntax-function">open {projects[0]?.slug}</span>
          </div>
        </div>

        <div className="mt-8">
          <div className="syntax-comment text-xs mb-3">
            // track record — try to type <span className="syntax-function">education</span> in terminal to view more details
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="bg-surface-container rounded-xl p-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="material-symbols-outlined text-secondary" style={{ fontSize: 16 }}>verified</span>
                <span className="syntax-comment text-[11px] uppercase tracking-wider">certifications</span>
              </div>
              <div className="text-2xl font-bold text-primary font-headline">
                {certifications.length}<span className="text-tertiary">+</span>
              </div>
            </div>
            <div className="bg-surface-container rounded-xl p-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="material-symbols-outlined text-tertiary" style={{ fontSize: 16 }}>emoji_events</span>
                <span className="syntax-comment text-[11px] uppercase tracking-wider">awards</span>
              </div>
              <div className="text-2xl font-bold text-primary font-headline">
                {achievements.length}<span className="text-tertiary">+</span>
              </div>
            </div>
            <div className="bg-surface-container rounded-xl p-4 col-span-2 sm:col-span-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="material-symbols-outlined text-primary" style={{ fontSize: 16 }}>workspace_premium</span>
                <span className="syntax-comment text-[11px] uppercase tracking-wider">total wins</span>
              </div>
              <div className="text-2xl font-bold text-primary font-headline">
                {certifications.length + achievements.length}<span className="text-tertiary">+</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
