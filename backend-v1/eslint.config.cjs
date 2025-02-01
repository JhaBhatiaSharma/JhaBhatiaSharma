const js = require("@eslint/js");
const globals = require("globals");
const unusedImports = require("eslint-plugin-unused-imports");
const prettier = require("eslint-plugin-prettier"); // ✅ Ensure Prettier is correctly required

/** @type {import("eslint").Linter.FlatConfig[]} */
module.exports = [
  {
    ignores: ["dist", "node_modules", "coverage", "__tests__/**", "credentials/**"],
  },
  {
    files: ["**/*.{js,mjs}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module", // ✅ Still supports ESM in files
      globals: {
        ...globals.node,
        jest: "readonly",
      },
    },
    plugins: {
      "unused-imports": unusedImports,
      prettier, // ✅ Register Prettier plugin
    },
    rules: {
      ...js.configs.recommended.rules,

      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
          caughtErrors: "all", // ✅ Allows unused errors in `catch` blocks
          caughtErrorsIgnorePattern: "^_", // ✅ Allows errors prefixed with `_`
        },
      ],

      // ✅ Enable Prettier as an ESLint rule
      "prettier/prettier": "error",
    },

    // ✅ Ensure ESLint doesn't remove `// eslint-disable-next-line`
    linterOptions: {
      reportUnusedDisableDirectives: false,
    },
  },
];
