/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#1a202c',
        'dark-surface': '#2d3748',
        'dark-text': '#e2e8f0',
        'dark-text-secondary': '#a0aec0',
        'primary': '#4f46e5',
        'primary-hover': '#4338ca',
        'green-trade': '#10b981',
        'red-trade': '#ef4444',
      },
    },
  },
  plugins: [],
}
