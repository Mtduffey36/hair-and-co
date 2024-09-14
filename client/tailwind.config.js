/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
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
  plugins: [],
}
