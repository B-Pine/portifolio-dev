import React from 'react';

export default {
  name: 'help',
  description: 'List all available commands.',
  run: ({ registry }) => ({
    type: 'inline',
    node: (
      <div className="space-y-1">
        <div className="syntax-comment">// Available commands</div>
        {Object.values(registry).map((cmd) => (
          <div key={cmd.name} className="grid grid-cols-[8rem_1fr] gap-3">
            <span className="syntax-function">{cmd.usage || cmd.name}</span>
            <span className="text-on-surface-variant">{cmd.description}</span>
          </div>
        ))}
        <div className="pt-2 syntax-comment">
          // Tip: press Tab for autocomplete · ↑/↓ for history · Ctrl+L to clear
        </div>
      </div>
    )
  })
};
