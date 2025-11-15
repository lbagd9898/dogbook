/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        doggy: ["doggy", "sans-serif"],
      },
    },
  },
  plugins: [],
};
