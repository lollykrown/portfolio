/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#020617",
        card: "#0f172a",
        accent: "#38bdf8",
        text: "#e2e8f0",
      },
    },
  },
  plugins: [],
};