const colors = require('tailwindcss/colors')

module.exports = {
  purge: {
    enabled: false,
    content: [
      './src/**/*.js'
    ]
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        sky: colors.sky,
        cyan: colors.cyan,
      },
      text: ['hover'],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}