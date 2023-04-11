/** @type {import('tailwindcss').Config} */

const spacing = {
  baseXS: "11px",
  baseS: "22px",
  base: "44px",
  baseL: "88px",
  baseXL: "176px",
  baseXXL: "264px",
};
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        gain: "#00DB06",
        loss: "#F00B00",
        BGcolor: "#E6E6E6",
        mainColor: "#333333",
      },
      padding: spacing,
      margins: spacing,
      width: spacing,
      height: spacing,
      gap: spacing,
      screens: {
        tablet: "650px",
      },
    },
  },
  plugins: [],
};
