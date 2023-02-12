/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,njk,md}", ".eleventy.js"],
  darkMode: "class",
  theme: {
    fontFamily: {
      header: ['"Brix Sans"', "sans-serif"], // hoss-sharp
      body: ['"Brix Sans"', "sans-serif"], // 'ratio'
      mono: ['"Jet Brains Mono"', "sans-serif"],
    },
    extend: {
      maxWidth: {
        "70ch": "70ch",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
