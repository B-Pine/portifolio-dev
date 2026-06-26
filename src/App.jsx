import React, { useEffect, useRef, useState } from 'react';
import TopBar from './components/TopBar.jsx';
import Sidebar from './components/Sidebar.jsx';
import EditorPane from './components/EditorPane.jsx';
import StatusBar from './components/StatusBar.jsx';
import Terminal from './components/Terminal.jsx';
import MobileFallback from './components/MobileFallback.jsx';
import projects from './data/projects.json';
import { executeCommand } from './commands/index.js';

const WELCOME_TAB = {
  id: 'welcome',
  title: 'README.md',
  icon: 'description',
  kind: 'welcome'
};

const FILE_ID_TO_COMMAND = {
  about: 'about',
  skills: 'skills',
  projects: 'projects',
  education: 'education',
  contact: 'contact'
};

const MOBILE_BREAKPOINT = 500;
const NARROW_BREAKPOINT = 900;

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' && window.innerWidth < MOBILE_BREAKPOINT
  );
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return isMobile;
}

function useIsNarrow() {
  const [narrow, setNarrow] = useState(
    typeof window !== 'undefined' && window.innerWidth < NARROW_BREAKPOINT
  );
  useEffect(() => {
    const onResize = () => setNarrow(window.innerWidth < NARROW_BREAKPOINT);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return narrow;
}

export default function App() {
  const [tabs, setTabs] = useState([WELCOME_TAB]);
  const [activeTabId, setActiveTabId] = useState(WELCOME_TAB.id);
  const [forceDesktop, setForceDesktop] = useState(false);
  const [terminalCollapsed, setTerminalCollapsed] = useState(true);
  const [terminalHeight, setTerminalHeight] = useState(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('terminalHeight') : null;
    return stored ? parseInt(stored, 10) : 224;
  });
  const gridRef = useRef(null);
  const isMobile = useIsMobile();
  const isNarrow = useIsNarrow();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(isNarrow);

  useEffect(() => {
    setSidebarCollapsed(isNarrow);
  }, [isNarrow]);

  useEffect(() => {
    localStorage.setItem('terminalHeight', String(terminalHeight));
  }, [terminalHeight]);

  function startResize(e) {
    e.preventDefault();
    const startY = e.clientY;
    const startHeight = terminalHeight;
    const gridRect = gridRef.current?.getBoundingClientRect();
    const maxHeight = gridRect ? gridRect.height - 100 : 800;

    function onMove(ev) {
      const delta = startY - ev.clientY;
      const next = Math.min(Math.max(80, startHeight + delta), maxHeight);
      setTerminalHeight(next);
    }
    function onUp() {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    }
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
    document.body.style.cursor = 'ns-resize';
    document.body.style.userSelect = 'none';
  }

  function openTab(tab) {
    setTabs((current) => {
      const exists = current.find((t) => t.id === tab.id);
      if (exists) return current.map((t) => (t.id === tab.id ? { ...t, ...tab } : t));
      return [...current, tab];
    });
    setActiveTabId(tab.id);
  }

  function closeTab(id) {
    setTabs((current) => {
      const next = current.filter((t) => t.id !== id);
      if (next.length === 0) {
        setActiveTabId(null);
        return next;
      }
      if (id === activeTabId) setActiveTabId(next[next.length - 1].id);
      return next;
    });
  }

  function handleCommandResult(result) {
    if (result?.type === 'open-tab' && result.tab) openTab(result.tab);
  }

  function openByCommand(name, arg) {
    const raw = arg ? `${name} ${arg}` : name;
    const result = executeCommand(raw);
    handleCommandResult(result);
  }

  function onOpenFile(fileId) {
    if (fileId === 'welcome') { openTab(WELCOME_TAB); return; }
    const cmd = FILE_ID_TO_COMMAND[fileId];
    if (cmd) openByCommand(cmd);
  }

  if (isMobile && !forceDesktop) {
    return (
      <div className="h-full bg-background text-on-surface">
        <MobileFallback onContinue={() => setForceDesktop(true)} />
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-background text-on-surface overflow-hidden">
      <TopBar tabs={tabs} activeTabId={activeTabId} onSelectTab={setActiveTabId} />
      <div className="flex flex-1 min-h-0 overflow-hidden">
        <Sidebar
          activeTabId={activeTabId}
          onOpenFile={onOpenFile}
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed((c) => !c)}
        />
        <div
          ref={gridRef}
          className="flex-1 grid min-w-0 min-h-0"
          style={{
            gridTemplateRows: terminalCollapsed
              ? 'minmax(0, 1fr) 2rem'
              : `minmax(0, 1fr) ${terminalHeight}px`
          }}
        >
          <div className="min-h-0 overflow-hidden">
            <EditorPane
              tabs={tabs}
              activeTabId={activeTabId}
              onSelectTab={setActiveTabId}
              onCloseTab={closeTab}
              onOpenProject={(slug) => openByCommand('open', slug)}
              onOpenFile={onOpenFile}
            />
          </div>
          <div className="bg-surface-container-lowest min-h-0 overflow-hidden relative">
            {!terminalCollapsed && (
              <div
                onMouseDown={startResize}
                className="absolute top-0 left-0 right-0 h-1 cursor-ns-resize hover:bg-primary/40 active:bg-primary/60 z-20 transition-colors"
                title="drag to resize"
              />
            )}
            <Terminal
              onCommandResult={handleCommandResult}
              collapsed={terminalCollapsed}
              onToggleCollapse={() => setTerminalCollapsed((c) => !c)}
            />
          </div>
        </div>
      </div>
      <StatusBar activeTabTitle={tabs.find((t) => t.id === activeTabId)?.title} />
    </div>
  );
}
