module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/airbnb',
    '@vue/typescript/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    indent: "off",
    'import/prefer-default-export': 'off',
    'no-plusplus': 'off',
    'no-underscore-dangle': 'off',
    'no-await-in-loop': 'off',
    'no-loop-func':'off'
  },
};
