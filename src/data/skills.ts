// Skill registry. Add or remove entries freely — UI is data-driven.
export type Skill = {
  name: string;
  category: 'language' | 'frontend' | 'backend' | 'database' | 'tooling';
  level?: 'learning' | 'comfortable' | 'proficient';
};

export const skills: Skill[] = [
  { name: 'Python',     category: 'language', level: 'proficient' },
  { name: 'JavaScript', category: 'language', level: 'proficient' },
  { name: 'TypeScript', category: 'language', level: 'comfortable' },
  { name: 'SQL',        category: 'language', level: 'comfortable' },
  { name: 'Java',       category: 'language', level: 'learning' },

  { name: 'React',      category: 'frontend', level: 'proficient' },
  { name: 'Tailwind',   category: 'frontend', level: 'proficient' },
  { name: 'Vite',       category: 'frontend', level: 'comfortable' },

  { name: 'Django',     category: 'backend',  level: 'proficient' },
  { name: 'Node.js',    category: 'backend',  level: 'comfortable' },
  { name: 'REST APIs',  category: 'backend',  level: 'proficient' },

  { name: 'MySQL', category: 'database', level: 'proficient' },
  { name: 'PostgreSQL', category: 'database', level: 'comfortable' },
  { name: 'SQLite',     category: 'database', level: 'comfortable' },

  { name: 'Git',        category: 'tooling',  level: 'proficient' },
  { name: 'Docker',     category: 'tooling',  level: 'comfortable' }
];
