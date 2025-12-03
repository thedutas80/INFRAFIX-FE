module.exports = {
  content: ['./dist/**/*.html', './src/**/*.{js,jsx,ts,tsx}', './*.html'],
  theme: {
    extend: {
      colors: {
        primary: '#096b68',
        secondary: '#129990',
        accent: '#90d1ca',
        light: '#fffbde'
      }
    }
  },
  plugins: [require('@tailwindcss/forms')],
  variants: {
    extend: {
      opacity: ['disabled']
    }
  }
}
