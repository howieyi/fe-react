module.exports = {
  extends: [
    'airbnb-base',
    'plugin:prettier/recommended',
    require.resolve('./rules/ts'),
  ],

  rules: {
    'comma-dangle': 'off',
  },
};
