/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-orange': '#ff8533',
        'dark-bg': '#0a0a0a',
        'dark-card': '#1a1a1a',
        'dark-border': '#2a2a2a',
      },
      fontFamily: {
        'mono': ['Courier New', 'monospace'],
      },
    },
  },
  plugins: [],
}