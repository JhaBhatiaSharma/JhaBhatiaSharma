import js from '@eslint/js';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import reactRefreshPlugin from 'eslint-plugin-react-refresh';

export default [
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx,mjs,cjs}'],
    ignores: ['dist/**'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        module: 'readonly',
        require: 'readonly',
        React: 'readonly',
        JSX: 'readonly',
        process: 'readonly',
        __dirname: 'readonly',
        localStorage: 'readonly',
        console: 'readonly',
      },
    },
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      'react-refresh': reactRefreshPlugin,
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'error',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react-refresh/only-export-components': [
        'warn',
        {
          allowConstantExport: true,
          allowExportNames: ['UserContext', 'UserProvider'],
        },
      ],
      'react/no-unescaped-entities': ['error', { forbid: ['>', '}', '"', "'"] }],
      'no-unused-vars': [
        'warn',
        {
          varsIgnorePattern: 'React|Router|Route|Routes|Navigate|ProtectedRoute|AuthenticationScreen|UserProvider',
          argsIgnorePattern: '^_', // Ignore unused arguments prefixed with '_'
        },
      ],
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
];

