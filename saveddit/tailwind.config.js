module.exports = {
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: [
      './src/**/*.js'
    ]
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        blue: {
          0: '#F1FAEE',
          100: '#A8DADC',
          200: '#457B9D',
          300: '#1D3557',
          400: '#1E2D42',
          500: '#1F2937'
        },
        red: {
          100: '#EA8689',
          200: '#E86068',
          300: '#E63946',
          400: '#D13440',
        },
        gold: {
          100: '#FCC200',
          200: '#F2A80F',
        }
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