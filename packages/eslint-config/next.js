const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [
    "eslint:recommended",
    "prettier",
    require.resolve("@vercel/style-guide/eslint/next"),
    "eslint-config-turbo",
    "./base.js",
  ],
  globals: {
    React: true,
    JSX: true,
  },
  env: {
    node: true,
  },
  plugins: ["only-warn", "import"],
  settings: {
    "import/resolver": {
      typescript: {
        project,
      },
    },
    react: {
      version: "detect",
    },
  },
  rules: {
    "no-unused-vars": ["error", { args: "none" }],
  },
  ignorePatterns: [
    // Ignore dotfiles
    ".*.js",
    "node_modules/",
  ],
  overrides: [
    { files: ["*.js?(x)", "*.ts?(x)"] },
    {
      files: ["src/app/**/*.{js,jsx,ts,tsx}"],
      rules: {
        "import/no-default-export": "off",
      },
    },
    {
      files: ["turbo/**/*.{js,jsx,ts,tsx}"],
      rules: {
        "import/no-default-export": "off",
      },
    },
  ],
};
