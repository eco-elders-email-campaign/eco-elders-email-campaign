import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "duck": "url('/Duck.png')"
      },
      animation: {'fall': 'fall 1s linear 1'},
      keyframes: {
        'fall': {
        '0%': {transform: 'translateY(0px)'},
        '100%':{transform: 'translateY(100vh)'}
        }
      }
    },
  },
  plugins: [],
};
export default config;
