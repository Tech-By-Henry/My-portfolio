/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  corePlugins: {
    preflight: false, // 🚫 disable Tailwind's base reset
  },
  theme: {
    extend: {},
  },
  plugins: [],
}
