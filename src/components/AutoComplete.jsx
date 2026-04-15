import React, { useLayoutEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const ITEM_H = 28;     // approx height per item (px)
const PADDING = 8;     // dropdown vertical padding
const GAP = 4;         // gap between input and dropdown
const MAX_H = 220;     // hard cap

export default function AutoComplete({ items, activeIndex, onPick, anchorRef }) {
  const [pos, setPos] = useState(null);

  useLayoutEffect(() => {
    if (!items || items.length === 0 || !anchorRef?.current) {
      setPos(null);
      return;
    }
    function place() {
      const rect = anchorRef.current.getBoundingClientRect();
      const desired = Math.min(items.length * ITEM_H + PADDING, MAX_H);
      const spaceAbove = rect.top - GAP;
      const spaceBelow = window.innerHeight - rect.bottom - GAP;

      // Prefer above (terminal feel) if it fits or if more room than below.
      const placeAbove = spaceAbove >= desired || spaceAbove >= spaceBelow;
      const maxHeight = Math.max(60, Math.min(desired, placeAbove ? spaceAbove : spaceBelow));

      setPos({
        left: rect.left,
        minWidth: 140,
        maxWidth: Math.min(420, window.innerWidth - rect.left - 8),
        maxHeight,
        width: 'max-content',
        ...(placeAbove
          ? { top: rect.top - maxHeight - GAP }
          : { top: rect.bottom + GAP })
      });
    }
    place();
    window.addEventListener('resize', place);
    window.addEventListener('scroll', place, true);
    return () => {
      window.removeEventListener('resize', place);
      window.removeEventListener('scroll', place, true);
    };
  }, [items, anchorRef]);

  if (!items || items.length === 0 || !pos) return null;

  return createPortal(
    <div
      style={{ position: 'fixed', ...pos }}
      className="z-[100] bg-surface-container-high rounded-md shadow-2xl shadow-black/50 overflow-y-auto animate-fade-in"
    >
      {items.map((item, i) => (
        <button
          key={item}
          type="button"
          onMouseDown={(e) => { e.preventDefault(); onPick(item); }}
          className={
            'w-full text-left px-3 py-1.5 font-mono text-xs transition-colors ' +
            (i === activeIndex
              ? 'bg-surface-container-highest text-primary'
              : 'text-on-surface-variant hover:bg-surface-container-highest')
          }
        >
          {item}
        </button>
      ))}
    </div>,
    document.body
  );
}
