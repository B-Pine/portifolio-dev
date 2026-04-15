import React from 'react';

export default function Output({ entry }) {
  return (
    <div className="mb-3 animate-fade-in">
      {entry.input != null && (
        <div className="flex items-center gap-2">
          <span className="text-tertiary font-bold">portfolio@pine:~$</span>
          <span className="text-on-surface">{entry.input}</span>
        </div>
      )}
      {entry.node && (
        <div className={'mt-1 ' + (entry.isError ? 'text-error' : 'text-on-surface-variant')}>
          {entry.node}
        </div>
      )}
    </div>
  );
}
