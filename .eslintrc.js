module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    'jest/globals': true
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'plugin:prettier/recommended'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'jest',
    'prettier'
  ],
  rules: {
    'semi': ['off'],
    'arrow-parens': ['off'],
    'no-console': ['off'],
    'operator-linebreak': ['error', 'after'],
    'react/jsx-filename-extension': ['off'], // ok?
    'comma-dangle': ['off'], // maybe
    'import/prefer-default-export': ['off'], // maybe
    'prefer-template': ['warn'], // todo
    'no-shadow': ['warn'], // todo
    'no-unused-vars': ['warn'], // todo
    'indent': ['warn'], // todo
    'prefer-const': ['warn'], // todo
    'dot-notation': ['warn'], // todo
    'max-len': ['warn'],
    'import/newline-after-import': ['warn'],
    'react/prop-types': ['warn'],
    'object-curly-newline': ['warn'],
    'react/require-default-props': ['warn'],
    'react/forbid-prop-types': ['warn'],
    'react/jsx-props-no-spreading': ['warn'],
    'react/button-has-type': ['warn'],
    'no-param-reassign': ['warn'],
    'no-use-before-define': ['warn'],
    'function-paren-newline': ['warn'],
    'implicit-arrow-linebreak': ['warn'],
    'space-before-function-paren': ['warn'],
    'prefer-rest-params': ['warn'],
    'one-var': ['warn'],
    'global-require': ['warn'],
    'quotes': ['warn'],
    'prefer-arrow-callback': ['warn'],
    'arrow-body-style': ['warn'],
    'react/no-children-prop': ['warn'],
    'operator-linebreak': ['warn'],
    'jsx-a11y/no-static-element-interactions': ['warn'],
    'import/no-dynamic-require': ['warn'],
    'space-infix-ops': ['warn'],
    'no-confusing-arrow': ['warn'],
    'react/jsx-curly-brace-presence': ['warn'],
    'jsx-a11y/click-events-have-key-events': ['warn'],
    'radix': ['warn'],
    'no-bitwise': ['warn'],
    'no-underscore-dangle': ['warn'],
    'no-inner-declarations': ['warn'],
    'no-unused-expressions': ['warn'],
    'prefer-destructuring': ['warn'],
    'react/jsx-closing-tag-location': ['warn'],
    'react/self-closing-comp': ['warn'],
    'import/no-extraneous-dependencies': ['warn'],
    'consistent-return': ['warn'],
    'import/no-cycle': ['warn'],
    'import/order': ['warn'],
    'no-prototype-builtins': ['warn'],
  },
};
