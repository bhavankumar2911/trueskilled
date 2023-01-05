const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: colors.green[500],
        secondary: colors.indigo[900],
      },
      screens: {
        xs: "425px",
        "md-lg": "873px",
      },
    },
  },
  plugins: [],
};
