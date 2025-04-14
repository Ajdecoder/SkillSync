// tailwind.config.js
module.exports = {
  darkMode: 'class', // ✅ REQUIRED to enable toggling via .dark class
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // ✅ Include all your JSX/TSX files
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
