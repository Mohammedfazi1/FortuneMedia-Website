import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // include TS/TSX
  ],
  theme: {
    extend: {},
  },
  plugins: [
    typography,
  ],
};

export default config;
