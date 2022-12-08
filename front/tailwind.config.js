/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{tsx,ts}", "./component/**/*.{tsx,ts}"],
  theme: {
    container: {
      center: true
    },
    extend: {},
  },
  plugins: [require('@tailwindcss/typography'), require("daisyui"), require('@tailwindcss/forms'),],
}
