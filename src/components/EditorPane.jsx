import React from 'react';
import WelcomeView from '../views/WelcomeView.jsx';
import EmptyEditor from '../views/EmptyEditor.jsx';
import AboutView from '../views/AboutView.jsx';
import SkillsView from '../views/SkillsView.jsx';
import ProjectsView from '../views/ProjectsView.jsx';
import ProjectDetailView from '../views/ProjectDetailView.jsx';
import ContactView from '../views/ContactView.jsx';

export default function EditorPane({ tabs, activeTabId, onSelectTab, onCloseTab, onOpenProject }) {
  const active = tabs.find((t) => t.id === activeTabId);

  return (
    <main className="h-full flex flex-col bg-surface-container-lowest min-w-0">
      <div className="flex items-center h-9 bg-surface overflow-x-auto shrink-0">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTabId;
          return (
            <div
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={
                'flex items-center gap-2 px-4 h-full min-w-fit cursor-pointer transition-colors ' +
                (isActive
                  ? 'bg-surface-container-lowest border-t-2 border-primary text-primary'
                  : 'bg-surface-container-low opacity-60 hover:opacity-100')
              }
            >
              <span className="material-symbols-outlined" style={{ fontSize: 14 }}>
                {tab.icon || 'description'}
              </span>
              <span className="text-xs font-medium">{tab.title}</span>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); onCloseTab(tab.id); }}
                className="text-on-surface-variant hover:bg-surface-container-high rounded p-0.5"
                aria-label={`close ${tab.title}`}
              >
                <span className="material-symbols-outlined" style={{ fontSize: 14 }}>close</span>
              </button>
            </div>
          );
        })}
      </div>

      <div className="flex-1 min-h-0 overflow-hidden">
        {tabs.length === 0
          ? <EmptyEditor />
          : active && <ViewForTab tab={active} onOpenProject={onOpenProject} />}
      </div>
    </main>
  );
}

function ViewForTab({ tab, onOpenProject }) {
  switch (tab.kind) {
    case 'welcome':  return <WelcomeView />;
    case 'about':    return <AboutView />;
    case 'skills':   return <SkillsView />;
    case 'projects': return <ProjectsView onOpenProject={onOpenProject} />;
    case 'project':  return <ProjectDetailView project={tab.payload} />;
    case 'contact':  return <ContactView />;
    default:         return null;
  }
}
