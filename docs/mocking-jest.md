# Jest Cheatsheet

Best cheatsheet I found from internets:
https://github.com/sapegin/jest-cheat-sheet

### Expect Promise value in async test

```js
test('resolve to lemon', async () => {
  expect.assertions(4)
  await expect(Promise.resolve('lemon')).resolves.toBe('lemon')
  await expect(Promise.resolve('lemon')).resolves.not.toBe('octopus')
  await expect(Promise.reject(Error('pizza'))).rejects.toThrow()
  await expect(Promise.reject('octopus')).rejects.toBeDefined()
})
```

## Expect throwing an error / rejecting

```js
// Non-promise
const callFunction = () => thisIsFunction(params)
expect(callFunction).toThrow()
// Promise
const callPromiseFunction = promiseFunction(params)
await expect(callPromiseFunction).rejects.toThrowError()
```

## Mocking

## Principles

1. By default use static mocking
2. Use dynamic mocking on if you need to spy or change the values between tests

## Static mock

### Whole module

```js
jest.mock('fs', () => ({
  func1: () => 'mockedValue',
  func2: () => true,
})
```

### Part of the module

```js
jest.mock('fs', () => ({
  ...jest.requireActual('fs'),
  mkdirSync: () => true,
}))
```

## Dynamic mock

### Whole module

```js
const { nonPromiseFunc, promiseFunc } = require('utils')
jest.mock('./utils')

nonPromiseFunc.mockImplementation(() => true)
nonPromiseFunc.mockReturnValue(true)
nonPromiseFunc.mockReturnValueOnce('some-file.txt')
promiseFunc.mockResolvedValue(returnValue)
promiseFunc.mockResolvedValueOnce(returnValue)
const failedPromise = jest.fn().mockRejectedValue('Error')
const failedPromiseOnce = jest.fn().mockRejectedValueOnce('Error')
```

### Part of module

```js
const { mkdirSync } = require('fs')

jest.mock('fs', () => ({
  ...jest.requireActual('fs'),
  mkdirSync: jest.fn(),
}))

mkdirSync.mockImplementation(() => true)
```

## Spying

```js
import { useDispatch } from './store'
jest.mock('./store')

const mockDispatch = jest.fn()
useDispatch.mockImplementation(() => mockDispatch)

expect(mockDispatch).toHaveBeenCalledTimes(1)
expect(mockDispatch).toHaveBeenCalledWith(params)
```
