/** @type {import('tailwindcss').Config} */
const c = (v) => `rgb(var(--color-${v}) / <alpha-value>)`;

export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        primary: c('primary'),
        'primary-container': c('primary-container'),
        'on-primary': c('on-primary'),
        secondary: c('secondary'),
        'on-secondary': c('on-secondary'),
        tertiary: c('tertiary'),
        'on-tertiary': c('on-tertiary'),
        background: c('background'),
        surface: c('surface'),
        'surface-dim': c('surface-dim'),
        'surface-bright': c('surface-bright'),
        'surface-container-lowest': c('surface-container-lowest'),
        'surface-container-low': c('surface-container-low'),
        'surface-container': c('surface-container'),
        'surface-container-high': c('surface-container-high'),
        'surface-container-highest': c('surface-container-highest'),
        'on-surface': c('on-surface'),
        'on-surface-variant': c('on-surface-variant'),
        outline: c('outline'),
        'outline-variant': c('outline-variant'),
        error: c('error'),
        'syntax-keyword': c('syntax-keyword'),
        'syntax-string': c('syntax-string'),
        'syntax-function': c('syntax-function'),
        'syntax-comment': c('syntax-comment')
      },
      fontFamily: {
        headline: ['"Space Grotesk"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        label: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace']
      },
      borderRadius: {
        DEFAULT: '0.125rem',
        md: '0.375rem',
        lg: '0.25rem',
        xl: '0.5rem'
      },
      animation: {
        'cursor-blink': 'blink 1s step-end infinite',
        'fade-in': 'fadeIn 200ms ease-out'
      },
      keyframes: {
        blink: {
          '0%, 50%': { opacity: '1' },
          '51%, 100%': { opacity: '0' }
        },
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(2px)' },
          to: { opacity: '1', transform: 'translateY(0)' }
        }
      }
    }
  },
  plugins: []
};
