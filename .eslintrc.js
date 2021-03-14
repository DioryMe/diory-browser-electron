module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    'jest/globals': true,
  },
  extends: ['plugin:react/recommended', 'airbnb', 'plugin:prettier/recommended'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    cy: true
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react', 'jest', 'prettier'],
  ignorePatterns: ['*.css', '*.feature', '*.json', '**/electron/readers/example-folder/**/*'],
  rules: {
    'no-confusing-arrow': ['warn'],
    'react/prop-types': ['warn'], // todo
    'func-names': ['warn'], // todo
    'import/newline-after-import': ['warn'],
    'react/button-has-type': ['warn'],
    semi: ['off'],
    'arrow-parens': ['off'],
    'no-console': ['off'],
    'no-shadow': ['off'],
    'react/jsx-filename-extension': ['off'], // ok?
    'comma-dangle': ['off'], // maybe
    'import/prefer-default-export': ['off'], // maybe
    'no-unused-vars': ['error', { args: 'none' }], // maybe?
    'react/require-default-props': ['off'],
    'react/forbid-prop-types': ['off'],
    'react/jsx-props-no-spreading': ['off'], // personal opinion
    'no-underscore-dangle': ['off'],
    'consistent-return': ['off'], // Personal opinion
    // TODO:
    'no-param-reassign': ['warn'],
    'no-use-before-define': ['warn'],
    'space-before-function-paren': ['warn'],
    'prefer-rest-params': ['warn'],
    'one-var': ['warn'],
    'global-require': ['warn'],
    quotes: ['error'],
    'prefer-arrow-callback': ['warn'],
    'arrow-body-style': ['warn'],
    'react/no-children-prop': ['warn'],
    'jsx-a11y/no-static-element-interactions': ['warn'],
    'import/no-dynamic-require': ['warn'],
    'space-infix-ops': ['warn'],
    'react/jsx-curly-brace-presence': ['warn'],
    'jsx-a11y/click-events-have-key-events': ['warn'],
    radix: ['warn'],
    'no-bitwise': ['warn'],
    'no-inner-declarations': ['warn'],
    'no-unused-expressions': ['warn'],
    'prefer-destructuring': ['warn'],
    'react/jsx-closing-tag-location': ['warn'],
    'react/self-closing-comp': ['warn'],
    'import/no-extraneous-dependencies': ['warn', { devDependencies: true }],
    'import/no-cycle': ['warn'],
    'import/order': ['warn'],
    'no-prototype-builtins': ['warn'],
    // Prettier:
    'operator-linebreak': ['off'], // prettier
    'max-len': ['off'], // prettier
    'object-curly-newline': ['off'], // prettier
    'function-paren-newline': ['off'], // prettier
    'implicit-arrow-linebreak': ['off'], // prettier
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
  },
}
