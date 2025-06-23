const {heroui} = require('@heroui/theme');
const flowbiteReact = require("flowbite-react/plugin/tailwindcss");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    ".flowbite-react\\\\class-list.json",
    "./node_modules/@heroui/theme/dist/components/(input-otp|form).js"
  ],
  theme: {
    extend: {},
  },
  plugins: [flowbiteReact,heroui()],
}