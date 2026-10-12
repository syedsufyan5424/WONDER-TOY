/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        toy: {
          pink: '#FF4B6E',
          pinkHover: '#E11D48',
          purple: '#8B5CF6',
          yellow: '#F59E0B',
          green: '#10B981',
          blue: '#0284C7',
          dark: '#0F172A',
          darkBlue: '#1E293B',
          softPink: '#FFF1F2',
          softBlue: '#F0F9FF',
          softYellow: '#FEFCE8',
          softPurple: '#FAF5FF',
          softGreen: '#F0FDF4',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        display: ['Outfit', 'Plus Jakarta Sans', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
        'card': '0 10px 25px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.02)',
        'glow-pink': '0 10px 25px -5px rgba(255, 75, 110, 0.4)',
      },
    },
  },
  plugins: [],
}
