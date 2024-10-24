/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  darkMode: 'class', // Enable dark mode using a class
  theme: {
    extend: {
      colors: {
        primary: '#ffffff', // Light mode background
        'primary-dark': '#1f2937', // Dark mode background
        'navbar-light': '#1f96f4', // Navbar color in light mode
        'navbar-dark': '#1a1f2e', // Navbar color in dark mode
        'text-color': '#000000', // Light mode text
        'text-color-dark': '#ffffff', // Dark mode text
        'border-color': '#d1d5db', // Light mode border color
        'border-color-dark': '#4b5563', // Dark mode border color
        'hover-color': '#f3f4f6', // Light mode hover color
        'hover-color-dark': '#374151', // Dark mode hover color
        
      },
    },
  },
  variants: {},
  plugins: [],
};