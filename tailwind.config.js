/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./**/*.vue",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
    require("daisyui")
  ],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          primary: "#1D9BF0",
          secondary: "teal",
        },
        dark: {
          ...require("daisyui/src/theming/themes")["dark"],
          primary: "#1D9BF0",
          secondary: "teal",
        },
      },
    ],
  }
}

