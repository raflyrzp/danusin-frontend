import type { Config } from "tailwindcss";

const config: Config = {
  // darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        danus: {
          primary: "#FEBA17",
          primaryDark: "#e5a612",
          background: "#F8F4E1",
          brown: "#4E1F00",
          brownSoft: "#74512D",
          surface: "#FFFFFF",
        },
        border: "#E5DEC5",
        input: "#E5DEC5",
        muted: {
          DEFAULT: "#EDE4C7",
          foreground: "#5C4B33",
        },
      },
      borderRadius: {
        xl: "1rem",
        lg: "0.75rem",
      },
      boxShadow: {
        soft: "0 8px 30px rgba(0,0,0,0.06)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
