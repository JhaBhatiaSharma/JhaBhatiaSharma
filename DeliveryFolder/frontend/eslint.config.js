import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import unusedImports from "eslint-plugin-unused-imports";

export default [
  { ignores: ["dist", "node_modules", "src/__tests__/**", "src/tests/**"] }, // ✅ Correctly formatted ignores
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser, // ✅ Enable browser globals
        jest: "readonly", // ✅ Enable Jest globals
      },
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    settings: { react: { version: "detect" } }, // ✅ Auto-detect React version
    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "unused-imports": unusedImports,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs["jsx-runtime"].rules,
      ...reactHooks.configs.recommended.rules,

      // ✅ Automatically remove unused imports and variables
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],

      // ✅ PropTypes validation (warnings only)
      "react/prop-types": ["warn"],

      // ✅ Automatically fix JSX escaping
      "react/no-unescaped-entities": ["error"],

      // ✅ Ensure useEffect dependencies are correctly set
      "react-hooks/exhaustive-deps": "warn",

      // ✅ Allow fast refresh in React
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],

      // ✅ Allow missing dependencies in Jest tests
      "no-undef": "off",
    },
    linterOptions: {
      reportUnusedDisableDirectives: true, // ✅ Report if ESLint disable comments are unused
    },
  },
];
