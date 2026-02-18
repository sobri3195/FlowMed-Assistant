import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        flowmed: {
          bg: "#f5f7fb",
          panel: "#ffffff",
          primary: "#0f172a",
          accent: "#2563eb",
          assistant: "#e2e8f0"
        }
      },
      boxShadow: {
        mobile: "0 20px 40px rgba(15, 23, 42, 0.14)"
      },
      keyframes: {
        "slide-fade": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        dot: {
          "0%, 80%, 100%": { transform: "scale(0.6)", opacity: "0.45" },
          "40%": { transform: "scale(1)", opacity: "1" }
        }
      },
      animation: {
        "slide-fade": "slide-fade 180ms ease-out",
        "typing-dot": "dot 1.2s infinite ease-in-out"
      }
    }
  },
  plugins: []
};

export default config;
