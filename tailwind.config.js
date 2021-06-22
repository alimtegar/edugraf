module.exports = {
  purge: false,
  // purge: {
  //   content: [
  //     './src/**/*.{js,jsx,ts,tsx}',
  //     './public/index.html',
  //   ],
  //   options: {
  //     safelist: [
  //       /^w-/,
  //       /^h-/,
  //       /^bg-/,
  //       /^text-/,
  //       /^rounded-/,
  //       /^shadow-/,
  //       /^top-/,
  //       /^aspect-/,
  //       /^p-/,
  //       /^border-/,
  //       /^grid-cols-/,
  //       /^.hover/,
  //     ],
  //   },
  // },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundColor: {},
      textColor: {},
      borderColor: {},
      translate: {
        '0.25': '1px',
        '1/6': '16.666667%',
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
        '18': '72px',
        '19': '76px',
        '21': '84px',
        '25': '100px',
        '27': '108px',
        '29': '116px',
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
      },
      inset: {
        '15': '60px',
        '0/8': '0',
        '1/8': '12.5%',
        '2/8': '25%',
        '3/8': '37.5%',
        '4/8': '50%',
        '5/8': '62.5%',
        '6/8': '75%',
        '7/8': '87.5%',
        '8/8': '100%',
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['active', 'group-active',],
      textColor: ['active', 'group-active',],
      textDecoration: ['active', 'group-active',],
    },
  },
  plugins: [
    require('tailwindcss-interaction-variants')
  ],
}
