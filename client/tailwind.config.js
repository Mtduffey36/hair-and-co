const autoprefixer = require('autoprefixer');

/** @type {import('tailwindcss').Config} */
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
  content: [
    './pages/**/*.{html,js}',
    './components/**/*.{html,js}',
    './public/index.html',
  ],
  theme: {
    extend: {
      colors: {
        'rosy-brown': '#C2A29D',
        'khaki': '#B5A283',
        'dim-gray': '#64696D',
        'charcoal': '3D4750',
        'timberwolf': '#CDD3D1',
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        fraunces: ['Fraunces', 'serif'],
      }
    }
  },
  // ...
}
