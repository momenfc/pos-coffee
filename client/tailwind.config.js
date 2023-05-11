const defaultTheme = require('tailwindcss/defaultTheme');
/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{html,js,ts,tsx,jsx}'],
  theme: {
    extend: {
      colors: {
        'color-primary': 'var(--color-primary)',
      },
    },
    fontFamily: {
      sans: ['Cairo', ...defaultTheme.fontFamily.sans],
      display: ['Cairo', 'sans-serif'],
      body: ['Inter', 'sans-serif'],
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
