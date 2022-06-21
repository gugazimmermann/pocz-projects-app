/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-var-requires */
const colors = require('tailwindcss/colors');
const forms = require('@tailwindcss/forms');

module.exports = {
  content: ['./public/**/*.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: colors.sky,
        secondary: colors.amber,
        current: 'currentColor',
      },
    },
  },
  plugins: [forms],
};
