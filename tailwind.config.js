/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundColor: {
        card: '#faf8fd',
        main: '#FAF9FE',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },

      colors: {
        primary: '#ff621f',
        secondary: '#08ac9e',
        grey: '#cfcfcf',
      },

      textColor: {
        primary: '#1f3347',
        pgr: '#595959',
      },

      borderRadius: {
        pic: '10px',
      },

      fontSize: {
        14: '14px',
        16: '16px',
        18: '18px',
        36: '36px',
      },

      lineHeight: {
        content: '1.67',
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
