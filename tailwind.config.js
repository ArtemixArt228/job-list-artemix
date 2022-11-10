/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "headline-clr": "#3A4562",
        primary: "#878D9D",
        line: "rgba(58, 69, 98, 0.13)",
        "violet-btn": "rgba(161, 177, 219, 0.317343)",
        "violet-bor": "rgba(85, 105, 158, 0.3)",
        "violet-t": "#55699E",
        "yellow-btn": "rgba(255, 207, 0, 0.15)",
        "yellow-bor": "#FFCF00",
        "yellow-t": "#988B49",
      },
    },
  },
  plugins: [],
};
