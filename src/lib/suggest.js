import { commands, registry, parseInput } from '../commands/index.js';

// Returns { suggestions: string[], replaceFrom: number }
// `replaceFrom` is the index in the input where the current token starts.
export function getSuggestions(input) {
  if (!input) return { suggestions: [], replaceFrom: 0 };

  const trailingSpace = /\s$/.test(input);
  const tokens = input.split(/\s+/).filter(Boolean);

  // First token (command name) — suggest from registry.
  if (tokens.length === 0 || (tokens.length === 1 && !trailingSpace)) {
    const partial = (tokens[0] || '').toLowerCase();
    const matches = commands
      .map((c) => c.name)
      .filter((n) => n.startsWith(partial));
    return { suggestions: matches, replaceFrom: input.length - partial.length };
  }

  // Subsequent tokens — defer to the command's argSuggestions().
  const cmd = registry[tokens[0].toLowerCase()];
  if (!cmd || typeof cmd.argSuggestions !== 'function') {
    return { suggestions: [], replaceFrom: input.length };
  }
  const argIndex = trailingSpace ? tokens.length - 1 : tokens.length - 2;
  const partial = trailingSpace ? '' : tokens[tokens.length - 1].toLowerCase();
  const all = cmd.argSuggestions({ argIndex, args: tokens.slice(1) }) || [];
  const matches = all.filter((s) => s.toLowerCase().startsWith(partial));
  return { suggestions: matches, replaceFrom: input.length - partial.length };
}

export { parseInput };
