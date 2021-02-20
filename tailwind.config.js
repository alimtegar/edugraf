module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      borderWidth: {
        '3': '3px',
      },
      borderRadius: {
        'none': '0',
        'xl': '1rem',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
