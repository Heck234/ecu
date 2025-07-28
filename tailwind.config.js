/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class', // important for toggling dark mode
  theme: {
  extend: {
  keyframes: {
    fadeLoop: {
      '0%, 100%': { opacity: 0 },
      '50%': { opacity: 1 },
    },
  },
  animation: {
    fadeLoop: 'fadeLoop 3s ease-in-out infinite',
  },
},

},

  plugins: [],
};
