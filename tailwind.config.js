module.exports = {
  // purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      top: {
        '0.75': '3px',
      },
      height: {
        '0.75': '3px',
      },
      borderWidth: {
        '3': '3px',
        '10': '10px',
        '12': '12px',
      },
      borderRadius: {
        'none': '0',
        'xl': '1rem',
      }
    },
  },
  variants: {
    extend: {
      backgroundColor: ['active'],
    },
  },
  plugins: [],
}
