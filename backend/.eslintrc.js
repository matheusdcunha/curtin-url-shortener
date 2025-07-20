module.exports = {
  env: {
    es2021: true,
    node: true,
  },

  parser: '@typescript-eslint/parser',

  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },

  plugins: [
    '@typescript-eslint',
    'import',
  ],


  extends: [
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],

  rules: {
    'import/prefer-default-export': 'off',
  },
};