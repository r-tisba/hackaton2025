/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        blue: {
          50: '#e6f3ff',
          100: '#cce7ff',
          200: '#99cfff',
          300: '#66b7ff',
          400: '#339fff',
          500: '#1d9bf0',
          600: '#0c7abf',
          700: '#095b8f',
          800: '#063c5f',
          900: '#031d30',
        },
      },
    },
  },
  plugins: [],
};