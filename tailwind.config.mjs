/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        beach: {
          turquoise: '#0D9488',
          'turquoise-light': '#14B8A6',
          'turquoise-dark': '#0F766E',
          cyan: '#06B6D4',
          sand: '#F7F3EA',
          'sand-light': '#FDFBF7',
          'sand-deep': '#EFE7D8',
          coral: '#F97316',
          'coral-light': '#FB923C',
          'coral-glow': '#FFEDD5',
          gold: '#F59E0B',
          volcano: '#090D14',
          'volcano-card': '#0F1622',
          'volcano-border': '#1A2436',
          ocean: '#0A2540',
        },
        whatsapp: '#25D366',
        'whatsapp-hover': '#20ba59',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        display: ['"Outfit"', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      keyframes: {
        wave: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '50%': { transform: 'rotate(6deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        pulseSlow: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.04)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        }
      },
      animation: {
        wave: 'wave 3s ease-in-out infinite',
        float: 'float 4s ease-in-out infinite',
        pulseSlow: 'pulseSlow 2.5s ease-in-out infinite',
      }
    },
  },
  plugins: [],
};
