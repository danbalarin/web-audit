/** @type {import("eslint").Linter.Config} */
module.exports = {
  parserOptions: {
    sourceType: "module",
  },
  rules: {
    "newline-before-return": "warn",
    "import/no-default-export": "error",
    "import/prefer-default-export": "off",
    "import/order": [
      "error",
      {
        "newlines-between": "always",
        alphabetize: { order: "asc", caseInsensitive: true },
        groups: [
          ["builtin", "external"],
          "internal",
          "parent",
          "sibling",
          "index",
        ],
        pathGroups: [
          { pattern: "~/**", group: "internal" },
          { pattern: "@repo/**", group: "internal" },
        ],
      },
    ],
  },
};
