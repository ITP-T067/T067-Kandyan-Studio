/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      
    },
    extend: {
      colors: {
        'kblack': {
          //light: '#67e8f9',
          DEFAULT: '#000000',
         //dark: '#0e7490',
        },
        'kwhite': {
          //light: '#67e8f9',
          DEFAULT: '#ffffff',
         //dark: '#0e7490',
        },
        'kgray': {
          //light: '#67e8f9',
          DEFAULT: '#525252',
         //dark: '#0e7490',
        },
        'kred': {
          //light: '#67e8f9',
          DEFAULT: '#bb0a21',
         //dark: '#0e7490',
        },
        'kyellow': {
          //light: '#67e8f9',
          DEFAULT: '#b99641',
         //dark: '#0e7490',
        },
        'kgreen': {
          //light: '#67e8f9',
          DEFAULT: '#12ac05',
         //dark: '#0e7490',
        },
        'kblue': {
          //light: '#67e8f9',
          DEFAULT: '#1c3f99',
         //dark: '#0e7490',
        },
        'korange': {
          //light: '#67e8f9',
          DEFAULT: '#f57c00',
         //dark: '#0e7490',
        },
      },
      backgroundImage: {
        'kandyan':{
          //light: '#67e8f9',
          DEFAULT: '#1c3f99',
          //dark: '#0e7490',
        }
      }
    },
  },
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
  ],

  layers: {
    utilities: {
      '.backdrop-blur': {
        'backdrop-filter': 'blur(60px)',
      },
    },
  },
};
