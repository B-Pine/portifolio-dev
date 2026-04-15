import React from 'react';

export default function StatusBar({ activeTabTitle }) {
  return (
    <footer className="flex justify-start items-center px-2 bg-surface-container-lowest h-7 shrink-0 text-[11px] font-label">
      <div className="text-primary flex items-center gap-1 px-3">
        <span className="material-symbols-outlined" style={{ fontSize: 14 }}>account_tree</span>
        <span>main*</span>
      </div>
      <div className="text-on-surface-variant flex items-center gap-1 px-3">
        <span className="material-symbols-outlined" style={{ fontSize: 14 }}>code</span>
        <span>{activeTabTitle || '—'}</span>
      </div>
      <div className="text-on-surface-variant flex items-center gap-1 px-3">
        <span className="material-symbols-outlined" style={{ fontSize: 14 }}>check_circle</span>
        <span>UTF-8</span>
      </div>
      <div className="ml-auto flex items-center">
        <div className="px-3 text-on-surface-variant">Ln 1, Col 1</div>
        <div className="px-3 text-on-surface-variant">Spaces: 2</div>
        <div className="px-3 flex items-center gap-1 text-tertiary">
          <span className="material-symbols-outlined" style={{ fontSize: 14 }}>cloud_done</span>
          <span>Synced</span>
        </div>
      </div>
    </footer>
  );
}
