import type { Config } from 'tailwindcss';

export const BRAND_COLORS = {
  'house-brown': {
    DEFAULT: '#684226',
    light: '#835432',
    dark: '#4e311a',
  },
  'crepe-gold': {
    DEFAULT: '#F9A825',
    light: '#fbc02d',
    dark: '#f57f17',
  },
  'strawberry-red': {
    DEFAULT: '#E53935',
    light: '#ef5350',
    dark: '#c62828',
  },
  'cream-whip': {
    DEFAULT: '#FFF8E1',
    50: '#fffdf5',
    100: '#FFF8E1',
    200: '#ffecb3',
    300: '#ffe082',
  },
  'chocolate-glaze': {
    DEFAULT: '#3E2723',
    surface: '#2b1b18',
    card: '#4a2f2b',
    border: '#5d3b36',
  },
  'mint-leaf': {
    DEFAULT: '#81C784',
    light: '#a5d6a7',
    dark: '#4caf50',
  },
  'truffle-gold': {
    DEFAULT: '#D4AF37',
    light: '#dfc266',
    dark: '#b39228',
  },
} as const;

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: BRAND_COLORS,
      fontFamily: {
        display: ['var(--font-fredoka)', 'sans-serif'],
        body: ['var(--font-outfit)', 'sans-serif'],
      },
      borderRadius: {
        '3xl': '1.5rem',
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        'warm-diffused': '0 10px 30px -10px rgba(104, 66, 38, 0.08)',
        'warm-hover': '0 20px 40px -12px rgba(104, 66, 38, 0.16)',
        'crepe-glow': '0 8px 30px -6px rgba(249, 168, 37, 0.35)',
        'dark-diffused': '0 10px 30px -10px rgba(0, 0, 0, 0.45)',
        'dark-hover': '0 20px 40px -12px rgba(0, 0, 0, 0.6)',
      },
    },
  },
  plugins: [],
};

export default config;
