// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//    "./index.html", "./src/**/*.{js,jsx,ts,tsx}",
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [require('daisyui')],
// }



/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        typing: 'typing 3s steps(30, end), blink .75s step-end infinite',
        blink: 'blink 1s step-end infinite',
      },
      keyframes: {
        typing: {
          from: { width: '0' },
          to: { width: '25%' },
        },
        blink: {
          '0%, 100%': { borderColor: 'transparent' },
          '50%': { borderColor: 'blue' },
        },
      },
    },
  },
  plugins: [require('daisyui')],
}
