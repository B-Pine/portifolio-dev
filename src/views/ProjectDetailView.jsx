import React from 'react';

export default function ProjectDetailView({ project }) {
  if (!project) return null;
  return (
    <div className="h-full overflow-auto p-8 font-mono text-sm leading-relaxed">
      <div className="max-w-3xl mx-auto">
        <div className="mb-2 syntax-comment text-xs">// projects / {project.slug}.md</div>
        <div className="mb-6">
          <span className="syntax-keyword text-2xl font-bold font-headline">
            # {project.name}
          </span>
          <div className="h-1 w-16 bg-primary mt-2 rounded-full" />
          <p className="text-on-surface-variant mt-3">{project.tagline}</p>
        </div>

        <section className="mb-6">
          <div className="syntax-comment text-xs mb-2">// description</div>
          <p className="text-on-surface leading-7">{project.description}</p>
        </section>

        <section className="mb-6">
          <div className="syntax-comment text-xs mb-2">// tech stack</div>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((t) => (
              <span
                key={t}
                className="px-2 py-1 bg-surface-container rounded text-xs text-tertiary"
              >
                {t}
              </span>
            ))}
          </div>
        </section>

        {project.features?.length > 0 && (
          <section className="mb-6">
            <div className="syntax-comment text-xs mb-2">// key features</div>
            <ul className="space-y-1.5">
              {project.features.map((f, i) => (
                <li key={i} className="flex gap-2 text-on-surface">
                  <span className="text-primary">▸</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {project.screenshots?.length > 0 && (
          <section className="mb-6">
            <div className="syntax-comment text-xs mb-2">// screenshots</div>
            <div className="grid grid-cols-2 gap-3">
              {project.screenshots.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`${project.name} screenshot ${i + 1}`}
                  className="w-full rounded-md bg-surface-container-lowest"
                />
              ))}
            </div>
          </section>
        )}

        <div className="flex flex-wrap gap-3 mt-8">
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-primary text-on-primary px-4 py-2 rounded-md text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-opacity"
            >
              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>open_in_new</span>
              View Live
            </a>
          ) : (
            <span className="inline-flex items-center gap-2 bg-surface-container px-4 py-2 rounded-md text-xs font-bold uppercase tracking-wider text-on-surface-variant cursor-not-allowed">
              View Live (n/a)
            </span>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-surface-container-high text-on-surface px-4 py-2 rounded-md text-xs font-bold uppercase tracking-wider hover:bg-surface-container-highest transition-colors"
            >
              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>code</span>
              GitHub
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
