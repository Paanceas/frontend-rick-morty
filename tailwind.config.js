/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary100: "#E6E1FF",
        primary600: "#6C63FF",
        primary700: "#574BD3",
        secondary600: "#6CE78B",
      },
    },
  },
  plugins: [],
};
