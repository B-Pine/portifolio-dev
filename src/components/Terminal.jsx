import React, { useEffect, useRef, useState } from 'react';
import Output from './Output.jsx';
import AutoComplete from './AutoComplete.jsx';
import { executeCommand } from '../commands/index.js';
import { getSuggestions } from '../lib/suggest.js';

const INTRO = [
  'Initializing environment... done.',
  'Loading components... done.',
  "Type 'help' for available commands."
];

export default function Terminal({ onCommandResult }) {
  const [history, setHistory] = useState([]);   // rendered lines
  const [input, setInput] = useState('');
  const [cmdHistory, setCmdHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [intro, setIntro] = useState([]);
  const [showIntro, setShowIntro] = useState(true);
  const [suggest, setSuggest] = useState({ suggestions: [], replaceFrom: 0 });
  const [activeSuggestion, setActiveSuggestion] = useState(0);

  function clearAll() {
    setHistory([]);
    setShowIntro(false);
  }

  const inputRef = useRef(null);
  const inputRowRef = useRef(null);
  const scrollerRef = useRef(null);

  // Typing intro effect.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      for (let i = 0; i < INTRO.length; i++) {
        await new Promise((r) => setTimeout(r, 350));
        if (cancelled) return;
        setIntro((prev) => [...prev, INTRO[i]]);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  // Auto-scroll on new output.
  useEffect(() => {
    if (scrollerRef.current) {
      scrollerRef.current.scrollTop = scrollerRef.current.scrollHeight;
    }
  }, [history, intro]);

  // Recompute suggestions on input change.
  useEffect(() => {
    setSuggest(getSuggestions(input));
    setActiveSuggestion(0);
  }, [input]);

  const focusInput = () => inputRef.current?.focus();

  function applySuggestion(value) {
    if (!value) return;
    const before = input.slice(0, suggest.replaceFrom);
    setInput(before + value + ' ');
  }

  function submit(raw) {
    const result = executeCommand(raw);
    const newEntries = [{ input: raw }];

    if (result?.type === 'clear') {
      clearAll();
      return;
    }
    if (result?.type === 'inline') {
      newEntries[0].node = result.node;
      newEntries[0].isError = result.isError;
    }
    if (result?.type === 'open-tab') {
      onCommandResult?.(result);
      newEntries[0].node = result.inlineNode || (
        <span className="syntax-comment">// opened {result.tab.title}</span>
      );
    }
    if (result == null) {
      // unknown handled inline above; nothing to add here.
    }

    setHistory((h) => [...h, ...newEntries]);
    setCmdHistory((h) => [...h, raw]);
    setHistoryIndex(-1);
  }

  function onKeyDown(e) {
    // Ctrl+L clears.
    if (e.ctrlKey && e.key.toLowerCase() === 'l') {
      e.preventDefault();
      clearAll();
      return;
    }
    const suggestionsVisible = input.trim().length > 0 && suggest.suggestions.length > 0;
    const items = suggest.suggestions;

    // Tab: cycle suggestions (or accept if exactly one).
    if (e.key === 'Tab') {
      e.preventDefault();
      if (items.length === 0) return;
      if (items.length === 1) {
        applySuggestion(items[0]);
      } else if (e.shiftKey) {
        setActiveSuggestion((i) => (i - 1 + items.length) % items.length);
      } else {
        setActiveSuggestion((i) => (i + 1) % items.length);
      }
      return;
    }

    // Up/Down: navigate suggestions when visible; otherwise navigate command history.
    if (e.key === 'ArrowUp') {
      if (suggestionsVisible && items.length > 0) {
        e.preventDefault();
        setActiveSuggestion((i) => (i - 1 + items.length) % items.length);
        return;
      }
      if (cmdHistory.length === 0) return;
      e.preventDefault();
      const next = historyIndex < 0 ? cmdHistory.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(next);
      setInput(cmdHistory[next]);
      return;
    }
    if (e.key === 'ArrowDown') {
      if (suggestionsVisible && items.length > 0) {
        e.preventDefault();
        setActiveSuggestion((i) => (i + 1) % items.length);
        return;
      }
      if (cmdHistory.length === 0) return;
      e.preventDefault();
      if (historyIndex < 0) return;
      const next = historyIndex + 1;
      if (next >= cmdHistory.length) {
        setHistoryIndex(-1);
        setInput('');
      } else {
        setHistoryIndex(next);
        setInput(cmdHistory[next]);
      }
      return;
    }

    if (e.key === 'Enter') {
      e.preventDefault();
      // If user navigated suggestions, accept the highlighted one.
      if (suggestionsVisible && activeSuggestion > 0 && items[activeSuggestion]) {
        applySuggestion(items[activeSuggestion]);
        return;
      }
      const value = input.trim();
      if (!value) return;
      submit(value);
      setInput('');
      return;
    }
    if (e.key === 'Escape') {
      setSuggest({ suggestions: [], replaceFrom: input.length });
    }
  }

  return (
    <div className="h-full flex flex-col" onClick={focusInput}>
      <div className="flex items-center px-4 h-8 bg-surface gap-6 shrink-0">
        <div className="flex items-center gap-2 border-b-2 border-primary h-full">
          <span className="text-[11px] font-bold text-primary uppercase tracking-wider">Terminal</span>
        </div>
        <div className="flex items-center gap-2 h-full opacity-50 cursor-not-allowed">
          <span className="text-[11px] font-bold uppercase tracking-wider">Output</span>
        </div>
        <div className="ml-auto flex items-center gap-3 text-on-surface-variant">
          <button
            type="button"
            title="clear (Ctrl+L)"
            onClick={(e) => { e.stopPropagation(); clearAll(); }}
            className="hover:text-primary"
          >
            <span className="material-symbols-outlined" style={{ fontSize: 14 }}>delete</span>
          </button>
        </div>
      </div>

      <div
        ref={scrollerRef}
        className="flex-1 min-h-0 px-4 pt-4 pb-1 font-mono text-xs leading-relaxed overflow-y-auto"
      >
        {showIntro && (
          <>
            <div className="mb-1 text-tertiary font-bold">
              portfolio@pine:~$ <span className="text-on-surface">welcome --init</span>
            </div>
            {intro.map((line, i) => (
              <div key={i} className="text-on-surface-variant animate-fade-in">{line}</div>
            ))}
          </>
        )}

        {(showIntro && history.length > 0) && <div className="mt-3" />}
        {history.map((entry, i) => (
          <Output key={i} entry={entry} />
        ))}
      </div>

      {/* Input row sits OUTSIDE the scroller so the autocomplete dropdown is never clipped. */}
      <div className="shrink-0 px-4 pb-3 font-mono text-xs leading-relaxed">
        <div ref={inputRowRef} className="relative flex items-center gap-2">
          <span className="text-tertiary font-bold shrink-0">portfolio@pine:~$</span>
          <div className="relative flex-1">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              spellCheck={false}
              autoComplete="off"
              autoCapitalize="off"
              autoCorrect="off"
              className="w-full bg-transparent outline-none text-on-surface caret-primary font-mono text-xs"
              aria-label="terminal input"
            />
            <AutoComplete
              items={input.trim().length > 0 && suggest.suggestions.length > 1 ? suggest.suggestions : []}
              activeIndex={activeSuggestion}
              onPick={applySuggestion}
              anchorRef={inputRowRef}
            />
            {/* Inline ghost completion when exactly one match remains. */}
            {input.trim().length > 0 && suggest.suggestions.length === 1 &&
              suggest.suggestions[0].length > (input.length - suggest.replaceFrom) && (
                <span className="pointer-events-none absolute left-0 top-0 font-mono text-xs whitespace-pre text-on-surface-variant/40">
                  <span className="invisible">{input}</span>
                  {suggest.suggestions[0].slice(input.length - suggest.replaceFrom)}
                </span>
              )}
          </div>
          <span className="w-2 h-4 bg-primary animate-cursor-blink shrink-0" />
        </div>
      </div>
    </div>
  );
}
