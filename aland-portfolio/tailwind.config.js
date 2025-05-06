/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // ✅ dark mode by class
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Plus Jakarta Sans", "Inter", "sans-serif"],
      },
      keyframes: {
        gradient: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        moveX: {
          "0%, 100%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(50px)" },
        },
        moveY: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(50px)" },
        },
        moveXY: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "50%": { transform: "translate(30px, -30px)" },
        },
        blob: {
          "0%": { transform: "translate(0px, 0px) scale(1)" },
          "33%": { transform: "translate(30px, -50px) scale(1.1)" },
          "66%": { transform: "translate(-20px, 20px) scale(0.9)" },
          "100%": { transform: "translate(0px, 0px) scale(1)" },
        },
      },
      animation: {
        blob: "blob 20s infinite ease-in-out",
        gradient: "gradient 15s ease infinite",
        moveX: "moveX 20s ease-in-out infinite",
        moveY: "moveY 25s ease-in-out infinite",
        moveXY: "moveXY 30s ease-in-out infinite",
      },
      colors: {
        background: "#0d0d11", // nice soft black
      },
    },
  },
  plugins: [],
};
