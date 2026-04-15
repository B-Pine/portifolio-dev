import React from 'react';
import projects from '../data/projects.json';

export default {
  name: 'open',
  usage: 'open <project>',
  description: 'Open a detailed project view by slug.',
  // Suggestions feed the autocomplete after `open ` is typed.
  argSuggestions: () => projects.map((p) => p.slug),
  run: ({ args }) => {
    const slug = (args[0] || '').toLowerCase();
    if (!slug) {
      return {
        type: 'inline',
        node: (
          <div>
            <div className="text-error">missing argument: project slug</div>
            <div className="syntax-comment mt-1">// usage: open &lt;project-slug&gt;</div>
            <div className="mt-2">Available:</div>
            <ul className="ml-4 list-disc">
              {projects.map((p) => (
                <li key={p.slug} className="syntax-function">{p.slug}</li>
              ))}
            </ul>
          </div>
        )
      };
    }
    const project = projects.find((p) => p.slug === slug);
    if (!project) {
      return {
        type: 'inline',
        node: <div className="text-error">no such project: {slug}</div>
      };
    }
    return {
      type: 'open-tab',
      tab: {
        id: `project:${project.slug}`,
        title: `${project.slug}.md`,
        icon: 'description',
        kind: 'project',
        payload: project
      }
    };
  }
};
