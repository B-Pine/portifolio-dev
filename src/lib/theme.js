import { useEffect, useState } from 'react';

const KEY = 'theme';

function read() {
  if (typeof window === 'undefined') return 'dark';
  return localStorage.getItem(KEY) || 'dark';
}

function apply(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  document.documentElement.classList.toggle('dark', theme === 'dark');
}

export function useTheme() {
  const [theme, setTheme] = useState(read);

  useEffect(() => {
    apply(theme);
    localStorage.setItem(KEY, theme);
  }, [theme]);

  function toggle() {
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'));
  }

  return { theme, toggle };
}
