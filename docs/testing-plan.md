# Testing plan

## Goals of testing
1. Avoid regression (if tests pass, we didn't break anything)
1. Improve design by forcing to define interfaces
1. Enable TDD kind of development
1. Make upgrading packages trivial (if tests pass, new packages didn't break anything)
1. Help to focus only on the most important (story-driven development)

## React

#### Features
```
yarn cypress run
```

#### Components
```
yarn storybook
```

#### Logic
```
yarn test
```

#### Format
```
yarn eslint
```

## Electron

#### Logic
```
yarn test-electron
```


## Integration

## Binary
