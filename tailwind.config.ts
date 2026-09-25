import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        kkgmiGreen: "#116530",
        kkgmiGold: "#D4AF37",
        kkgmiLightGreen: "#E8F5E9"
      },
    },
  },
  plugins: [],
};
export default config;
