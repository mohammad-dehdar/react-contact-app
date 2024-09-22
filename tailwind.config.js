/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Open Sans', 'sans-serif'],
      },
      colors: {
        gray: "#e9ecef",
        skyBlue: "#caf0f8",
        blue : "#00a6fb",
        darkBlue: "#001d3d"
      },
    },
  },
  plugins: [],
}

