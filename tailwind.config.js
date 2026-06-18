/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        cream: '#F5F0E6',
        ink: '#1A1A1A',
        navy: '#2C3E6B',
        forest: '#3D5C3A',
        terracotta: '#C4654A',
        mustard: '#D4A843',
        border: '#8B7355',
        paper: '#EDE6D6',
      },
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif'],
        sketch: ['var(--font-sketch)', 'cursive'],
      },
      boxShadow: {
        sketch: '2px 2px 0 0 rgba(26, 26, 26, 0.15)',
      },
      borderRadius: {
        sketch: '2px',
      },
    },
  },
  plugins: [],
};
