import React from 'react';
import { skills } from '../data/skills.ts';

const CATEGORIES = [
  { key: 'language', label: 'Languages',  icon: 'terminal' },
  { key: 'frontend', label: 'Frontend',   icon: 'web' },
  { key: 'backend',  label: 'Backend',    icon: 'dns' },
  { key: 'database', label: 'Databases',  icon: 'database' },
  { key: 'tooling',  label: 'Tooling',    icon: 'build' }
];

const LEVEL_DOTS = { learning: 1, comfortable: 2, proficient: 3 };
const LEVEL_LABEL = { learning: 'Learning', comfortable: 'Comfortable', proficient: 'Proficient' };
const LEVEL_TEXT = {
  learning: 'text-secondary',
  comfortable: 'text-primary',
  proficient: 'text-tertiary'
};
const LEVEL_DOT = {
  learning: 'bg-secondary',
  comfortable: 'bg-primary',
  proficient: 'bg-tertiary'
};

function Dots({ level }) {
  const filled = LEVEL_DOTS[level] ?? 0;
  return (
    <span className="flex gap-1">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className={
            'w-1.5 h-1.5 rounded-full ' +
            (i < filled ? LEVEL_DOT[level] : 'bg-surface-container-highest')
          }
        />
      ))}
    </span>
  );
}

export default function SkillsView() {
  return (
    <div className="h-full overflow-auto p-8 font-mono text-sm leading-relaxed">
      <div className="max-w-4xl mx-auto pb-12">
        <div className="mb-2 syntax-comment text-xs">// src / data / skills.ts</div>
        <div className="mb-8">
          <span className="syntax-keyword text-2xl font-bold font-headline">// skills</span>
          <div className="h-1 w-16 bg-primary mt-2 rounded-full" />
        </div>

        <div className="space-y-6">
          {CATEGORIES.map((cat) => {
            const items = skills.filter((s) => s.category === cat.key);
            if (items.length === 0) return null;
            return (
              <section key={cat.key}>
                <div className="flex items-baseline gap-3 mb-3">
                  <span className="material-symbols-outlined text-primary" style={{ fontSize: 16 }}>
                    {cat.icon}
                  </span>
                  <h3 className="font-headline text-sm font-bold text-on-surface uppercase tracking-wider">
                    {cat.label}
                  </h3>
                  <span className="syntax-comment text-[10px]">[ {items.length} ]</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {items.map((s) => (
                    <div
                      key={s.name}
                      className="group flex items-center gap-2.5 bg-surface-container hover:bg-surface-container-high transition-colors rounded-md pl-3 pr-2.5 py-1.5"
                      title={LEVEL_LABEL[s.level]}
                    >
                      <span className="text-on-surface text-xs">{s.name}</span>
                      <Dots level={s.level} />
                    </div>
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        <div className="mt-10 flex items-center flex-wrap gap-4 text-[10px] uppercase tracking-wider">
          <span className="syntax-comment">// legend:</span>
          <span className="flex items-center gap-1.5">
            <Dots level="learning" />
            <span className={LEVEL_TEXT.learning}>Learning</span>
          </span>
          <span className="flex items-center gap-1.5">
            <Dots level="comfortable" />
            <span className={LEVEL_TEXT.comfortable}>Comfortable</span>
          </span>
          <span className="flex items-center gap-1.5">
            <Dots level="proficient" />
            <span className={LEVEL_TEXT.proficient}>Proficient</span>
          </span>
        </div>
      </div>
    </div>
  );
}
