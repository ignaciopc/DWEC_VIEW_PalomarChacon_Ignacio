module.exports = {
  content: [
    "./index.html",
    "./jquery.html",
    "./src/**/*.{html,js}",
    "./js/**/*.{js}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        amarillo: {
          clarito: "#f7f2aa",
          normal: "#f7ec54",
          pollo: "#ffef00",
        },
      },
      spacing: {
        "27xl": "120rem",
      },
      screens: {
        "5xl": "2000px",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("flowbite/plugin"),
  ],
};
