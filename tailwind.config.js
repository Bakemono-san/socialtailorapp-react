/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      screens:{
        'tv': '1550px',
      },
      width:{
        'tv': '1550px'
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

