import React from 'react';
import { profile } from '../data/profile.js';

export default {
  name: 'about',
  description: 'Open about.md in the editor.',
  run: () => ({
    type: 'open-tab',
    tab: { id: 'about', title: 'about.md', icon: 'info', kind: 'about' },
    inlineNode: (
      <div className="text-on-surface-variant">
        Opened <span className="syntax-function">about.md</span> in editor.
      </div>
    )
  })
};
