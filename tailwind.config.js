/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.{html,ejs}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fff5f2',
          100: '#ffe7de',
          200: '#ffd3c2',
          300: '#ffb39a',
          400: '#ff8b6d',
          500: '#f9735b',
          600: '#e55a43',
          700: '#c54633',
          800: '#a2392f',
          900: '#7f2f28',
        },
        accent: {
          50: '#fdf2f8',
          100: '#fde7f2',
          200: '#fbcfe8',
          300: '#f9a8d4',
          400: '#f472b6',
          500: '#ec4899',
          600: '#db2777',
          700: '#be185d',
        },
        surface: {
          50: '#fdf8f7',
          100: '#f8efed',
          200: '#f1e0dc',
          300: '#e6c9c2',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
        'card-hover': '0 8px 20px rgba(0,0,0,0.08)',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
    },
  },
  plugins: [],
}