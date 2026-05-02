import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Sora", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      colors: {
        ink: "#0f172a",
        paper: "#f8fafc",
        surface: "#ffffff",
        border: "#e2e8f0",
        muted: "#64748b",
        hint: "#94a3b8",
        blue: {
          DEFAULT: "#2563eb",
          bg: "#eff6ff",
          bd: "#bfdbfe",
        },
        cyan: {
          DEFAULT: "#0891b2",
          bg: "#ecfeff",
          bd: "#a5f3fc",
        },
        teal: "#059669",
        amber: "#b45309",
      },
    },
  },
  plugins: [],
};

export default config;
