import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const { nextui } = require("@nextui-org/react");

export default {
  content: [
    "./src/**/*.tsx",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          500: "#f58634",
          900: "#9b3234",
        },
        secondary: {
          200: "#fff688",
          500: "#ffcc29",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
} satisfies Config;
