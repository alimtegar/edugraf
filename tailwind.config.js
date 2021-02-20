module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
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
