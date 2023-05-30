const defaultConfig = require("tailwindcss/defaultConfig");
const formsPlugin = require("@tailwindcss/forms");
const daisyui = require("daisyui");

/** @type {import('tailwindcss/types').Config} */
const config = {
  content: ["index.html", "src/**/*.tsx"],
  theme: {
    fontFamily: {
      sans: ["Fira Sans", ...defaultConfig.theme.fontFamily.sans]
    },
    extend: {
      animation: {
        "slide-in-blurred-top": "slide-in-blurred-top 0.3s ease-out   both"
      },
      keyframes: {
        "slide-in-blurred-top": {
          "0%": {
            transform: "translateY(-1000px) scaleY(2.5) scaleX(.2)",
            "transform-origin": "50% 0%",
            filter: "blur(40px)",
            opacity: "0"
          },
          to: {
            transform: "translateY(0) scaleY(1) scaleX(1)",
            "transform-origin": "50% 50%",
            filter: "blur(0)",
            opacity: "1"
          }
        }
      }
    }
  },
  experimental: { optimizeUniversalDefaults: true },
  plugins: [
    formsPlugin
    /* daisyui */
  ]
};
module.exports = config;
