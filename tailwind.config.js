/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        xs: "475px",
      },
      fontSize: {
        "xxs": "10px",
        "15": "15px",
        "22": "22px",
      },
      colors: {
        "light": "var(--light)",
        "dark-500": "var(--dark-500)",
        "dark-600": "var(--dark-600)",
        "primary-300": "var(--primary-300)",
        "primary-400": "var(--primary-400)",
        "primary-500": "var(--primary-500)",
        "secondary-color": "var(--secondary-color)",
        "gray-color": "var(--gray-400)",
      },
      backgroundColor: {
        "light": "var(--light)",
        "dark-500": "var(--dark-500)",
        "dark-600": "var(--dark-600)",
        "primary-300": "var(--primary-300)",
        "primary-400": "var(--primary-400)",
        "primary-500": "var(--primary-500)",
        "secondary-color": "var(--secondary-color)",
        "gray-color": "var(--gray-400)",
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      borderWidth: {
        '1': '1px'
      },
      minWidth: theme => ({
        24: theme('spacing[24]'),
        32: theme('spacing[32]'),
      })
    },
  },
  plugins: [],
}
