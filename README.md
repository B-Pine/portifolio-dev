# Portfolio.dev — BUGINGO Innocent

An IDE-themed interactive portfolio with a fully functional terminal.

## Stack
Vite + React + Tailwind CSS · EmailJS for the contact form.

## Run

```bash
npm install
npm run dev
```

Open http://localhost:5173.

## Configure EmailJS (contact form)

1. Create a free account at https://dashboard.emailjs.com/
2. Copy `.env.example` to `.env`
3. Fill in `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY`

Until configured, the contact form shows a friendly "not configured" notice — everything else works.

## Adding content

| What            | Where                                   |
| --------------- | --------------------------------------- |
| Profile / bio   | `src/data/profile.js`                   |
| Projects        | `src/data/projects.json` (one per entry)|
| Skills          | `src/data/skills.ts`                    |
| Resume PDF      | drop into `public/resume.pdf`           |

### Adding a project

Append a new object to `src/data/projects.json` — `slug` is what users type after `open`:

```json
{
  "slug": "my-new-project",
  "name": "My New Project",
  "tagline": "One-line hook.",
  "description": "Longer paragraph.",
  "techStack": ["React", "Node"],
  "features": ["...", "..."],
  "screenshots": [],
  "liveUrl": "",
  "githubUrl": "",
  "year": 2025,
  "status": "in-progress"
}
```

The autocomplete and `projects` view pick it up automatically — no other changes needed.

### Adding a terminal command

1. Create `src/commands/<name>.jsx`:

```jsx
export default {
  name: 'mycommand',
  description: 'What it does.',
  // optional: argSuggestions: () => ['arg1', 'arg2'],
  run: ({ args }) => ({ type: 'inline', node: <span>hello</span> })
};
```

2. Register it in `src/commands/index.js`.

That's it — `help`, autocomplete, and parsing all work automatically.

## Terminal commands

| Command          | Effect                                   |
| ---------------- | ---------------------------------------- |
| `help`           | List all commands                        |
| `about`          | Open about.md                            |
| `skills`         | Open skills.ts                           |
| `projects`       | Open projects.json                       |
| `open <slug>`    | Open a project's detail view             |
| `contact`        | Open contact form                        |
| `clear`          | Clear terminal (also Ctrl+L)             |

Tab cycles autocomplete · ↑/↓ navigates command history · Esc dismisses suggestions.

## Deploy (Vercel)

```bash
npx vercel
```

Set the env vars in the Vercel dashboard. Build command: `npm run build`, output: `dist`.
