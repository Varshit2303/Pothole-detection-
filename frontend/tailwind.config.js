/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          900: '#0F172A', // Slate 900
          800: '#1E293B', // Slate 800
          700: '#334155', // Slate 700
        },
        primary: {
          500: '#3B82F6', // Blue 500
          400: '#60A5FA', // Blue 400
        },
        accent: {
          500: '#8B5CF6', // Violet 500
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        orbitron: ['Orbitron', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
