/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0a0e1a',
        surface: '#111827',
        surface2: '#1f2937',
        accent: '#FFD700',
        'text-main': '#E8EAF0',
        muted: '#9CA3AF',
      },
    },
  },
  plugins: [],
}

