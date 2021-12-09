# Testing Cheatsheet

Attempt to help making tests and enforce our testing conventions.

Best cheatsheet I found from internets (for extra tips):
https://github.com/sapegin/jest-cheat-sheet

## Expect Promise value in async test

```js
test('resolve to diory', async () => {
  expect.assertions(4)
  await expect(promiseFunc(params)).resolves.toEqual('diory')
  await expect(promiseFunc(params)).resolves.not.toEqual('google')
  await expect(promiseFunc(params)).rejects.toThrow()
  await expect(promiseFunc(params)).rejects.toBeDefined()

  const returnValue = await promiseFunc(params)
  expect(returnValue).toEqual('diory')
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

### Whole module

```js
const { nonPromiseFunc, promiseFunc } = require('./utils')
jest.mock('./utils')

nonPromiseFunc.mockImplementation(() => true)
nonPromiseFunc.mockReturnValue(true)
nonPromiseFunc.mockReturnValueOnce('some-file.txt')
promiseFunc.mockResolvedValue(returnValue)
promiseFunc.mockResolvedValueOnce(returnValue)
const failedPromise = jest.fn().mockRejectedValue('Error')
const failedPromiseOnce = jest.fn().mockRejectedValueOnce('Error')
```

### Only part of the module

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
const { nonPromiseFunc, promiseFunc } = require('./utils')
jest.mock('./utils')

const mockNonPromiseFunc = jest.fn()
const mockPromiseFunc = jest.fn()

beforeEach(() => {
  nonPromiseFunc.mockImplementation(() => mockNonPromiseFunc)
  promiseFunc.mockImplementation(() => mockPromiseFunc)
})

it('', () => {
  expect(mockNonPromiseFunc).toHaveBeenCalledTimes(1)
  expect(mockNonPromiseFunc).toHaveBeenCalledWith(params)

  expect(mockPromiseFunc).toHaveBeenCalledTimes(1)
  expect(mockPromiseFunc).toHaveBeenCalledWith(params)
})
```
