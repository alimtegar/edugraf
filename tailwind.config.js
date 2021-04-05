module.exports = {
  // purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      translate: {
        '0.25': '1px',
      },
      top: {
        '0.75': '3px',
      },
      width: {
        '10.5': '42px',
      },
      height: {
        '0.75': '3px',
        '10.5': '42px',
        '15': '60px',
        '90': '360px',
      },
      padding: {
        '12.5': '50px',
        '13': '52px',
        '15': '60px',
        '17': '68px',
        '25': '100px',
      },
      borderWidth: {
        '3': '3px',
        '10': '10px',
        '12': '12px',
      },
      borderRadius: {
        'none': '0',
        'xl': '1rem',
      },
      boxShadow: {
        'default': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      }
    },
  },
  variants: {
    extend: {
      backgroundColor: ['active', 'group-active'],
      textColor: ['active', 'group-active'],
    },
  },
  plugins: [
    require('tailwindcss-interaction-variants')
  ],
}
