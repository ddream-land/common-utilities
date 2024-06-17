/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");

export default {
  content: [
    './src/**/*.{ts,tsx}',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [
    nextui({
      prefix: "nextui", // prefix for themes variables
      addCommonColors: true, // override common colors (e.g. "blue", "green", "pink").
      defaultTheme: "dark", // default theme from the themes object
      defaultExtendTheme: "dark", // default theme to extend on custom themes
      layout: {
        
      }, // common layout tokens (applied to all themes)
      themes: {
        light: {
          layout: {}, // light theme layout tokens
          colors: {
          }, // light theme colors
        },
        dark: {
          layout: {
          }, // dark theme layout tokens
          colors: {
            background:"#13161A",
            // primary: { DEFAULT: "#6366f1"},
            success: {
              800: "#b5f8db",
              900: "#ddfff2"
            },
            warning: {
              50: "#312107",
              100: "#62420e",
              200: "#936316",
              300: "#c4841d"
            },
            // warning: { DEFAULT: "#6366f1"},
            // danger: { DEFAULT: "#6366f1"},
          }, // dark theme colors
        },
        // ... custom themes
      },
    })
  ],
}
