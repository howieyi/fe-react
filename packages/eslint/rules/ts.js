const { join } = require('path');
const { existsSync } = require('fs');

let tsconfigPath = join(process.cwd(), 'tsconfig.json');

if (!existsSync(tsconfigPath)) {
  tsconfigPath = join(__dirname, '../tsconfig.json');
}

module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
  },

  settings: {
    'import/resolver': {
      typescript: {},
    },
  },

  extends: ['airbnb-typescript'],

  parserOptions: {
    project: tsconfigPath,
  },

  rules: {
    'comma-dangle': 'off',
    '@typescript-eslint/comma-dangle': 'off',
    'no-console': 'off',
    'jsx-a11y/no-noninteractive-element-to-interactive-role': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'no-multi-assign': 'off',
    'no-underscore-dangle': 'off',
    'no-restricted-syntax': 'off',
    'guard-for-in': 'off',
    'no-plusplus': 'off',
    'no-nested-ternary': 'off',
    'no-continue': 'off',
    'prefer-template': 'off',
    'no-param-reassign': 'off',
    'import/prefer-default-export': 'off',
    'react/prop-types': 'off',
    'react/button-has-type': 'off',
    'react/no-children-prop': 'off',
    'react/jsx-curly-brace-presence': 'off',
    'react/no-array-index-key': 'off',
    'react/require-default-props': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    '@typescript-eslint/naming-convention': 'off',
    '@typescript-eslint/dot-notation': 'off',
    '@typescript-eslint/no-unused-expressions': 'off',
  },
};
