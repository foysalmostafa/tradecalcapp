import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#fff8ed',
          100: '#ffefd4',
          200: '#ffdba8',
          300: '#ffc071',
          400: '#ff9a38',
          500: '#ff7c12',
          600: '#f05f07',
          700: '#c74508',
          800: '#9e380f',
          900: '#7f3010',
          950: '#451505',
        },
        // Amber-gold accent used throughout
        gold: {
          400: '#D4943A',
          500: '#C07B28',
          600: '#A3661F',
        },
        surface: {
          light: '#FAFAF8',
          dark: '#111827',
        },
      },
      fontFamily: {
        display: ['Georgia', 'Charter', 'Times New Roman', 'serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '1rem' }],
      },
    },
  },
  plugins: [],
};

export default config;
