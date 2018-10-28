module.exports = {
  parser: 'babel-eslint',
  extends: ['universe', 'eslint:recommended', 'plugin:react/recommended'],
  env: {
    browser: true,
    node: true,
  },
  rules: {
    'react/display-name': false,
  },
};
