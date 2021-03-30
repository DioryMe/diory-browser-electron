module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    'jest/globals': true,
  },
  extends: [
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'airbnb',
    'plugin:prettier/recommended',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    cy: true,
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
    'consistent-return': ['off'], // Personal opinion
    'no-underscore-dangle': ['off'],
    'import/no-extraneous-dependencies': ['warn', { devDependencies: true }],
    'arrow-body-style': ['error', 'as-needed'],
    'prefer-destructuring': [
      'error',
      {
        array: false,
        object: true,
      },
      {
        enforceForRenamedProperties: false,
      },
    ],
    // TODO:
    'no-param-reassign': ['warn'],
    'no-use-before-define': ['warn'],
    'prefer-rest-params': ['warn'],
    'global-require': ['warn'],
    'react/no-children-prop': ['warn'],
    'jsx-a11y/no-static-element-interactions': ['warn'],
    'jsx-a11y/click-events-have-key-events': ['warn'],
    radix: ['warn'],
    'no-bitwise': ['warn'],
    'no-unused-expressions': ['warn'],
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
