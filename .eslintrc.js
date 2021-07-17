module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: ['airbnb-base', 'airbnb-typescript', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 12,
    project: './tsconfig.eslint.json',
  },
  rules: {
    'react/no-children-prop': 'off',
  },
};
