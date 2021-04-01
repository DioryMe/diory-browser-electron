const HomeStore = require('electron-store')
const { eventHandlerWrapper } = require('./channel-util')
const { saveHomeEventHandler } = require('./save-home-channel')

// Mock electron-store
jest.mock('electron-store')
// Mock store.set
const mockHomeStoreSet = jest.fn()

describe('saveHomeEventHandler', () => {
  beforeEach(() => {
    HomeStore.mockImplementation(() => ({ set: mockHomeStoreSet }))
  })

  it('calls store.set(home: params)', async () => {
    const params = 'this is new home object to be saved'

    const response = await eventHandlerWrapper('SAVE_HOME', saveHomeEventHandler)(params)

    expect(mockHomeStoreSet.mock.calls.length).toBe(1)
    expect(mockHomeStoreSet.mock.calls[0][0]).toEqual({ home: params })

    expect(response).toEqual(true)
  })
})
