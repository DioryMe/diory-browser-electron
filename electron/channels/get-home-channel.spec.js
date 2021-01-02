const HomeStore = require('electron-store')
const { eventHandlerWrapper } = require('./channel-util')
const { getHomeEventHandler, defaultHome } = require('./get-home-channel')

// Mock event.reply
const mockEventReply = jest.fn()
const mockEvent = { reply: mockEventReply }
// Mock electron-store
jest.mock('electron-store')

describe('getHomeEventHandler', () => {
  it('empty store', async () => {
    HomeStore.mockImplementation(() => ({ get: () => undefined }))

    const params = {}
    const response = await eventHandlerWrapper('GET_HOME', getHomeEventHandler)(mockEvent, params)

    expect(response).toEqual(defaultHome)
  })

  it('store with value', async () => {
    HomeStore.mockImplementation(() => ({ get: () => 'value' }))

    const params = {}
    const response = await eventHandlerWrapper('GET_HOME', getHomeEventHandler)(mockEvent, params)

    expect(response).toEqual('value')
  })
})
