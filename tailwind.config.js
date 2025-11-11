/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#0f2c4b', // Your deep logo blue
        'accent': '#16e1a7',  // Your vibrant logo green
        'accent-dark': '#13c893' // A slightly darker green for hovers
      }
    },
  },
  plugins: [],
};