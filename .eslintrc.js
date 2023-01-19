module.exports = {
  root: true,
  env: {
    node: true,
    commonjs: true,
    es6: true,
    jest: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  ignorePatterns: [
    '.eslintrc.js',
    'babel.config.js',
    'metro.config.js',
    'custom.d.ts',
    'generated.ts',
  ],
  extends: [
    'airbnb/hooks',
    'airbnb-typescript',
    'eslint:recommended',
    'plugin:jest/recommended',
    'plugin:cypress/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:@typescript-eslint/recommended',
    '@react-native-community',
  ],
  plugins: [
    '@typescript-eslint',
    'react',
    'jsx-a11y',
    'react-hooks',
    'import',
    'jsdoc',
    '@react-native-community',
    'eslint-plugin-no-inline-styles',
  ],
  globals: {
    JSX: true,
  },
  settings: {
    jsdoc: {
      mode: 'typescript',
    },
  },
  rules: {
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },
};
