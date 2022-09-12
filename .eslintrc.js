module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'airbnb',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    'react/jsx-filename-extension': [
      2,
      {extensions: ['.js', '.jsx', '.ts', '.tsx']},
    ],
    'no-const-assign': 2,
    'no-dupe-args': 2,
    'no-dupe-class-members': 1,
    'no-dupe-else-if': 2,
    'no-duplicate-imports': 1,
    'no-ex-assign': 1,
    'no-func-assign': 2,
    'no-inner-declarations': 1,
    'no-self-assign': 1,
    'no-sparse-arrays': 2,
    'no-unreachable': 2,
    'no-unused-vars': 2,
    'no-use-before-define': 2,
    camelcase: 2,
    'consistent-return': 1,
    curly: 2,
    'default-case': 2,
    'default-case-last': 2,
    eqeqeq: 1,
    'func-style': [2, 'declaration', {allowArrowFunctions: true}],
    'max-classes-per-file': [2, 1],
    'max-nested-callbacks': [2, 3],
    'no-console': 0,
    'no-extra-semi': 1,
    'no-invalid-this': 0,
    'no-label-var': 2,
    'no-undefined': 2,
    'require-await': 2,
    'react/prefer-stateless-function': [0, {ignorePureComponents: true}],
    'jsx-quotes': [0, 'prefer-double'],
    quotes: 0,
    'spaced-comment': 0,
    'import/prefer-default-export': 0,
    'react/destructuring-assignment': 0,
    'import/newline-after-import': 0,
    'jsx-a11y/label-has-associated-control': 0,
    'jsx-a11y/label-has-for': 0,
    'react/jsx-props-no-spreading': 0,
    'react/state-in-constructor': 0,
    'lines-between-class-members': 0,
    'react/default-props-match-prop-types': 0,
    'react/require-default-props': 0,
    'import/no-unresolved': 0,
    'import/extensions': 0,
    "react/function-component-definition": [
      "error",
      {
        "namedComponents": ["function-declaration", "arrow-function"],
        "unnamedComponents": "arrow-function"
      }
    ],
    "no-shadow": "off",
    "@typescript-eslint/no-shadow": ["error"],
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "error"
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        'no-undef': 'off',
        semi: 'off',
        "no-shadow": "off",
        "@typescript-eslint/no-shadow": ["error"]
      },
    },
  ],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
};