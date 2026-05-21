import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        jarvis: {
          dark: "#0a0e1a",
          darker: "#060912",
          navy: "#101829",
          blue: "#1e3a5f",
          cyan: "#00d4ff",
          "cyan-light": "#7df9ff",
          accent: "#0ea5e9",
          glow: "#00b4d8",
        },
      },
      animation: {
        glow: "glow 2s ease-in-out infinite alternate",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        glow: {
          "0%": { boxShadow: "0 0 5px #00d4ff, 0 0 10px #00d4ff" },
          "100%": { boxShadow: "0 0 20px #00d4ff, 0 0 40px #00d4ff" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
