/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{html,njk,md}", ".eleventy.js"],
	darkMode: "class",
	theme: {
		fontFamily: {
			header: ['"hoss-sharp"', "sans-serif"],
			body: ['"ratio"', "sans-serif"],
		},
		extend: {
			maxWidth: {
				"70ch": "70ch",
			},
		},
	},
	plugins: [require("@tailwindcss/typography")],
};
