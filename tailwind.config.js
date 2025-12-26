/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Dark theme colors with subtle red accent
        'cafe-beige': '#1F1F1F',
        'cafe-brown': '#D32F2F', // Subtle red accent - Material Design Red 700
        'cafe-pink': '#F44336', // Lighter red for hover states
        'cafe-cream': '#121212', // Dark background
        'cafe-dark-brown': '#B71C1C', // Darker red for darker states
        'dark-bg': '#121212',
        'dark-surface': '#1E1E1E',
        'dark-surface-elevated': '#2D2D2D',
        'dark-text-primary': '#FFFFFF',
        'dark-text-secondary': '#B3B3B3',
        'dark-border': '#333333',
      },
    },
  },
  plugins: [],
}

