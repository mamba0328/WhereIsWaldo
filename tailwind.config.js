/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mainBg: '#022C43',
        secondaryText: '#053F5E',
        mainText: '#FFF',
        secondaryBg: '#115173',
        highlightText: '#FFD700',
        appGreen: 'rgb(22,163, 74)',
      },
    },
  },
  plugins: [],
}

