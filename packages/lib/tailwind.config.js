const { nextui } = require('@nextui-org/react')

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    '../../node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        "blue": {
          "50": "#dbfbff",
          "100": "#b4ebfa",
          "200": "#8addf1",
          "300": "#60cfea",
          "400": "#36c1e3",
          "500": "#18a9cc",
          "600": "#0b829d",
          "700": "#005d72",
          "800": "#003946",
          "900": "#00151b"
        },
        "green": {
          "50": "#ddfff2",
          "100": "#b5f8db",
          "200": "#89f2c5",
          "300": "#5eecaf",
          "400": "#32e798",
          "500": "#18cd7f",
          "600": "#0c9f62",
          "700": "#037246",
          "800": "#004528",
          "900": "#00190a"
        },
        "zinc": {
          "50": "#fafafa",
          "100": "#f4f4f5",
          "200": "#e2e2e7",
          "300": "#cfcfd8",
          "400": "#a0a0aa",
          "500": "#70707a",
          "600": "#52525b",
          "700": "#3c3c42",
          "800": "#25252a",
          "900": "#15151a"
        },
        "cyan": {
          "50": "#defffc",
          "100": "#b5f9f5",
          "200": "#8bf4ec",
          "300": "#60efe5",
          "400": "#3ceade",
          "500": "#28d0c4",
          "600": "#1aa399",
          "700": "#0b746d",
          "800": "#004641",
          "900": "#001917"
        },
      }
    },
  },
  darkMode: 'class',
  plugins: [
    nextui({
      prefix: 'nextui', // prefix for themes variables
      addCommonColors: true, // override common colors (e.g. "blue", "green", "pink").
      defaultTheme: 'dark', // default theme from the themes object
      defaultExtendTheme: 'dark', // default theme to extend on custom themes
      layout: {}, // common layout tokens (applied to all themes)
      themes: {
        light: {
          layout: {}, // light theme layout tokens
          colors: {}, // light theme colors
        },
        dark: {
          layout: {}, // dark theme layout tokens
          colors: {
            background: '#13161A',
            primary: { DEFAULT: "#18A8CC"},
            success: {
              800: '#b5f8db',
              900: '#ddfff2',
            },
            warning: {
              50: '#312107',
              100: '#62420e',
              200: '#936316',
              300: '#c4841d',
            },
            // warning: { DEFAULT: "#6366f1"},
            // danger: { DEFAULT: "#6366f1"},
          }, // dark theme colors
        },
        // ... custom themes
      },
    }),
  ],
}
