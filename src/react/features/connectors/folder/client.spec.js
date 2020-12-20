// THIS CLIENT WILL BE OBSOLETE SOON

import { getRoom } from './client'

const mockSend = jest.fn().mockReturnThis()
const mockOn = jest.fn().mockReturnThis()

jest.mock(
  'electron',
  () => {
    const mockIpcRenderer = {
      send: mockSend,
      on: mockOn,
    }
    return { ipcRenderer: mockIpcRenderer }
  },
  { virtual: true }
)

describe('getRoom', () => {
  it('works', () => {
    getRoom('address').then((response) => {
      expect(mockSend.mock.calls.length).toBe(1)
      expect(mockOn.mock.calls.length).toBe(1)
    })
  })
})
