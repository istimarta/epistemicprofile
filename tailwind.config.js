/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body: ['"Source Serif 4"', 'serif'],
        mono: ['"DM Mono"', 'monospace'],
      },
      colors: {
        surface: {
          DEFAULT: '#f6f3ee',
          card: '#fffdf8',
          dark: '#181714',
          'card-dark': '#1f1d19',
        },
        ink: {
          DEFAULT: '#1a1916',
          secondary: '#3d3b35',
          muted: '#8a8780',
          dark: '#e8e4dc',
          'secondary-dark': '#b5b0a6',
          'muted-dark': '#6b675f',
        },
        accent: {
          DEFAULT: '#2d4a3e',
          light: '#3d6b56',
          green: '#4e8a6e',
          'green-light': '#6db88a',
          red: '#c45d3e',
          'red-light': '#d4785f',
        },
        line: {
          DEFAULT: '#d6d2ca',
          dark: '#302d28',
        },
        track: {
          DEFAULT: '#e8e4dc',
          dark: '#252320',
        },
      },
      animation: {
        'fade-up': 'fadeUp 0.8s ease',
        'fade-up-fast': 'fadeUp 0.5s ease',
        'pulse-slow': 'pulse 1.5s ease infinite',
        'spin-slow': 'spin 0.8s linear infinite',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  darkMode: 'media',
  plugins: [],
};
