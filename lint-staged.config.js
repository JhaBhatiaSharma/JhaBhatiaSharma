module.exports = {
  'DeliveryFolder/frontend/**/*.{js,jsx}': [
    'cd DeliveryFolder/frontend && eslint --fix'
  ],
  'DeliveryFolder/backend/**/*.js': [
    'cd DeliveryFolder/backend && eslint --fix'
  ],
  '*.{json,md,yml,yaml}': [
    'prettier --write'
  ]
};
