import React, { useState } from 'react';
import projects from '../data/projects.json';

const VIEWS = [
  { id: 'list', icon: 'view_agenda', label: 'List' },
  { id: 'tree', icon: 'folder_open', label: 'Directory' }
];

export default function ProjectsView({ onOpenProject }) {
  const [view, setView] = useState('list');

  return (
    <div className="h-full overflow-auto p-8 font-mono text-sm leading-relaxed">
      <div className="max-w-3xl mx-auto pb-12">
        <div className="flex items-start justify-between mb-6 gap-4">
          <div>
            <span className="syntax-keyword text-2xl font-bold font-headline">// projects.json</span>
            <div className="h-1 w-16 bg-primary mt-2 rounded-full" />
          </div>
          <div className="flex bg-surface-container rounded-md p-1 shrink-0">
            {VIEWS.map((v) => {
              const active = v.id === view;
              return (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => setView(v.id)}
                  className={
                    'flex items-center gap-1.5 px-3 py-1 rounded text-[11px] uppercase tracking-wider transition-colors ' +
                    (active
                      ? 'bg-surface-container-highest text-primary'
                      : 'text-on-surface-variant hover:text-on-surface')
                  }
                  title={`${v.label} view`}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: 14 }}>{v.icon}</span>
                  {v.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="syntax-comment mb-4">
          // {projects.length} entries — click to open or run{' '}
          <span className="syntax-function">open &lt;slug&gt;</span>
        </div>

        {view === 'list' ? <ListView onOpen={onOpenProject} /> : <TreeView onOpen={onOpenProject} />}
      </div>
    </div>
  );
}

function ListView({ onOpen }) {
  return (
    <div className="space-y-3">
      {projects.map((p, i) => (
        <button
          type="button"
          key={p.slug}
          onClick={() => onOpen(p.slug)}
          className="w-full text-left bg-surface-container hover:bg-surface-container-high p-5 rounded-xl transition-colors group"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <span className="syntax-comment text-xs">{String(i).padStart(2, '0')}</span>
              <span className="syntax-function text-base font-bold">{p.name}</span>
            </div>
            <span className={
              'text-[10px] uppercase tracking-wider px-2 py-0.5 rounded ' +
              (p.status === 'live'
                ? 'bg-tertiary/20 text-tertiary'
                : 'bg-secondary/20 text-secondary')
            }>
              {p.status}
            </span>
          </div>
          <p className="text-xs text-on-surface-variant mb-3">{p.tagline}</p>
          <div className="flex flex-wrap gap-1.5">
            {p.techStack.map((t) => (
              <span key={t} className="px-2 py-0.5 bg-surface-container-lowest rounded text-[10px] text-tertiary">
                {t}
              </span>
            ))}
          </div>
          <div className="syntax-comment text-[10px] mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
            // open {p.slug}
          </div>
        </button>
      ))}
    </div>
  );
}

function TreeView({ onOpen }) {
  const [openSlug, setOpenSlug] = useState(projects[0]?.slug);

  return (
    <div className="bg-surface-container rounded-xl p-4">
      <div className="flex items-center gap-2 text-on-surface mb-1">
        <span className="material-symbols-outlined text-sm">folder_open</span>
        <span className="text-sm">projects/</span>
      </div>

      {projects.map((p) => {
        const expanded = openSlug === p.slug;
        return (
          <div key={p.slug}>
            <button
              type="button"
              onClick={() => setOpenSlug(expanded ? null : p.slug)}
              className="w-full flex items-center gap-2 pl-4 pr-2 py-1 hover:bg-surface-container-high rounded transition-colors text-left group"
            >
              <span className="material-symbols-outlined text-sm text-on-surface-variant">
                {expanded ? 'expand_more' : 'chevron_right'}
              </span>
              <span className={'material-symbols-outlined text-sm ' + (expanded ? 'text-primary' : 'text-yellow-500')}>
                {expanded ? 'folder_open' : 'folder'}
              </span>
              <span className="text-sm text-on-surface">{p.slug}/</span>
              <span className={
                'ml-auto text-[10px] uppercase tracking-wider px-2 py-0.5 rounded ' +
                (p.status === 'live'
                  ? 'bg-tertiary/20 text-tertiary'
                  : 'bg-secondary/20 text-secondary')
              }>
                {p.status}
              </span>
            </button>

            {expanded && (
              <div className="ml-10 mb-2 mt-1 border-l border-outline-variant/30 pl-3 space-y-0.5 animate-fade-in">
                <FileRow icon="description" iconClass="text-primary" name="README.md"
                         onClick={() => onOpen(p.slug)} hint="open detail view" />
                <Meta label="name" value={p.name} />
                <Meta label="tagline" value={p.tagline} />
                <Meta label="stack" value={p.techStack.join(', ')} />
                {p.liveUrl && <LinkRow icon="open_in_new" label="live.url" href={p.liveUrl} />}
                {p.githubUrl && <LinkRow icon="code" label="repo.git" href={p.githubUrl} />}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function FileRow({ icon, iconClass, name, onClick, hint }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full flex items-center gap-2 px-2 py-1 hover:bg-surface-container-high rounded text-left group"
    >
      <span className={'material-symbols-outlined text-sm ' + (iconClass || 'text-on-surface-variant')}>{icon}</span>
      <span className="text-xs text-on-surface">{name}</span>
      {hint && (
        <span className="ml-auto syntax-comment text-[10px] opacity-0 group-hover:opacity-100 transition-opacity">
          // {hint}
        </span>
      )}
    </button>
  );
}

function LinkRow({ icon, label, href }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="flex items-center gap-2 px-2 py-1 hover:bg-surface-container-high rounded text-primary"
    >
      <span className="material-symbols-outlined text-sm">{icon}</span>
      <span className="text-xs">{label}</span>
      <span className="ml-auto syntax-comment text-[10px] truncate max-w-[60%]">{href}</span>
    </a>
  );
}

function Meta({ label, value }) {
  return (
    <div className="flex gap-2 px-2 py-0.5 text-xs">
      <span className="syntax-comment shrink-0">{label}:</span>
      <span className="text-on-surface-variant truncate">{value}</span>
    </div>
  );
}
