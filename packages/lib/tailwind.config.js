const { nextui } = require('@nextui-org/theme')

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{ts,tsx}',
    '../../node_modules/@nextui-org/theme/dist/components/(button|snippet|code|input|modal).js',
  ],
  theme: {
    extend: {},
  },
  darkMode: 'class',
  plugins: [nextui()],
}
