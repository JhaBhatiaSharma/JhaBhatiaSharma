import js from '@eslint/js';

export default [
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx,mjs,cjs}'],
    ignores: ['**/node_modules/**', 
      '**/DeliveryFolder/frontend/dist/**',
      '**/DeliveryFolder/backend/node_modules/**'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        module: 'readonly',
        require: 'readonly'
      }
    }
  }
];
