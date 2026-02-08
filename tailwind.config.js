/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        /* PRIMARY */
        primary: 'var(--color-primary)',
        'on-primary': 'var(--color-on-primary)',
        'primary-container': 'var(--color-primary-container)',
        'on-primary-container': 'var(--color-on-primary-container)',

        /* ACCENT / TERTIARY */
        accent: 'var(--color-accent)',
        'on-accent': 'var(--color-on-accent)',
        'accent-container': 'var(--color-accent-container)',
        'on-accent-container': 'var(--color-on-accent-container)',

        /* SURFACES */
        surface: 'var(--color-surface)',
        'surface-variant': 'var(--color-surface-variant)',
        outline: 'var(--color-outline)',
      },
    },
  },
  plugins: [],
};
