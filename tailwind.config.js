/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        exide: {
          red: '#E31E24',
          darkRed: '#C41A1F',
          blue: '#1A3E6F',
          darkBlue: '#0F2A4A',
          light: '#F5F5F5',
          dark: '#333333',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

