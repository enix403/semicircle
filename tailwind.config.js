const defaultConfig = require("tailwindcss/defaultConfig");
const formsPlugin = require("@tailwindcss/forms");
const daisyui = require("daisyui");

/** @type {import('tailwindcss/types').Config} */
const config = {
  content: ["index.html", "src/**/*.tsx"],
  theme: {
    fontFamily: {
      sans: ["Fira Sans", ...defaultConfig.theme.fontFamily.sans]
    }
  },
  experimental: { optimizeUniversalDefaults: true },
  plugins: [
    formsPlugin,
    /* daisyui */
  ]
};
module.exports = config;
