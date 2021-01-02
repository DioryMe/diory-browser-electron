const HomeStore = require('electron-store')
const { eventHandlerWrapper } = require('./channel-util')
const { saveHomeEventHandler } = require('./save-home-channel')

// Mock event.reply
const mockEventReply = jest.fn()
const mockEvent = { reply: mockEventReply }
// Mock electron-store
jest.mock('electron-store')
const mockHomeStoreSet = jest.fn()
HomeStore.mockImplementation(() => ({ set: mockHomeStoreSet }))

describe('saveHomeEventHandler', () => {
  it('calls store.set(home: params)', async () => {
    const params = 'this is new home object to be saved'

    const response = await eventHandlerWrapper('SAVE_HOME', saveHomeEventHandler)(mockEvent, params)

    expect(mockHomeStoreSet.mock.calls.length).toBe(1)
    expect(mockHomeStoreSet.mock.calls[0][0]).toEqual({ home: params })

    expect(response).toEqual(true)
  })
})
