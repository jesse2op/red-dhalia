/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cafe-beige': '#FFF8F8',
        'cafe-brown': '#E31837',
        'cafe-pink': '#FFB6C1',
        'cafe-cream': '#FFFFFF',
        'cafe-dark-brown': '#C41E3A',
      },
    },
  },
  plugins: [],
}

