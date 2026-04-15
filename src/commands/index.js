// Command registry. To add a new command:
//   1. create src/commands/<name>.jsx exporting { name, description, run, ... }
//   2. import + add it below.
import help     from './help.jsx';
import about    from './about.jsx';
import skills   from './skills.jsx';
import projects from './projects.jsx';
import open     from './open.jsx';
import contact  from './contact.jsx';
import clear    from './clear.js';

export const commands = [help, about, skills, projects, open, contact, clear];

export const registry = Object.fromEntries(commands.map((c) => [c.name, c]));

export function parseInput(raw) {
  const trimmed = raw.trim();
  if (!trimmed) return null;
  const [name, ...args] = trimmed.split(/\s+/);
  return { name: name.toLowerCase(), args, raw: trimmed };
}

export function executeCommand(raw, context = {}) {
  const parsed = parseInput(raw);
  if (!parsed) return null;
  const cmd = registry[parsed.name];
  if (!cmd) {
    return {
      type: 'inline',
      node: `command not found: ${parsed.name} — type 'help' for a list.`,
      isError: true
    };
  }
  return cmd.run({ args: parsed.args, registry, ...context });
}
