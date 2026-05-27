import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'pr-cream': '#F1EEEB',
        'pr-nude': '#E4D8CB',
        'pr-grey': '#4D443D',
        'pr-t': '#6a5e55',
        'pr-dark': '#4D443D',
        'pr-black': '#2A2420',
      },
      fontFamily: {
        'futura': ['Futura medium', 'sans-serif'],
        'editorial': ['Canela', 'Editorial New', 'Cormorant Garamond', 'serif'],
        'body': ['Inter', 'Neue Haas Grotesk', 'Suisse Intl', 'sans-serif'],
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
        '160': '40rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out',
        'fade-in-up': 'fadeInUp 1s ease-out',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
