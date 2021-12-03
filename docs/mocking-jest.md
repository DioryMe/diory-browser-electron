# Jest Mocking Cheatsheet

Best cheatsheet I found from internets:
https://github.com/sapegin/jest-cheat-sheet#mock-functions

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

### Static mock the whole module

```js
jest.mock('fs', () => ({
  func1: () => 'mockedValue',
  func2: () => true
})
```

### Static mock part of the module

```js
jest.mock('fs', () => ({
  ...jest.requireActual('fs'),
  mkdirSync: () => true),
}))
```

### Dynamic mock the whole module

```js
const { mkdirSync, existsSync } = require('fs')

jest.mock('fs')

mkdirSync.mockImplementation(() => true)
existsSync.mockImplementation(() => true)
```

### Dynamic mock part of the module

```js
const { mkdirSync } = require('fs')

jest.mock('fs', () => ({
  ...jest.requireActual('fs'),
  mkdirSync: jest.fn(),
}))

mkdirSync.mockImplementation(() => true)
```

### Dynamic mock Promise

```js
promiseFunc.mockResolvedValue(returnValue)
promiseFunc.mockResolvedValueOnce(returnValue)
const failedPromise = jest.fn().mockRejectedValue('Error')
const failedPromiseOnce = jest.fn().mockRejectedValueOnce('Error')
```

### Dynamic mock non-promise

```js
nonPromiseFunc.mockImplementation(() => true)
anotherNonPromiseFunc.mockReturnValueOnce('some-file.txt')
```

### Spy

```js
import { useDispatch } from './store'
jest.mock('../../../store')

const mockDispatch = jest.fn()
useDispatch.mockImplementation(() => mockDispatch)

expect(mockDispatch).toHaveBeenCalledTimes(1)
expect(mockDispatch).toHaveBeenCalledWith(params)
```

### Non-Promise to throw error:

```js
const callFunction = () => thisIsFunction(params)
expect(callFunction).toThrow()
```

### Promise to throw error:

```js
const callPromiseFunction = promiseFunction(params)
await expect(callPromiseFunction).rejects.toThrowError()
```
