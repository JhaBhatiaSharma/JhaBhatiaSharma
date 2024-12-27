module.exports = {
  'frontend/**/*.{js,jsx}': [
    'cd frontend && eslint --fix'
  ],
  'backend/**/*.js': [
    'cd backend && eslint --fix'
  ],
  '*.{json,md,yml,yaml}': [
    'prettier --write'
  ]
};
