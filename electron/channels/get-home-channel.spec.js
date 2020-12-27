import { eventHandlerWrapper } from './channel-util'
import { getHomeEventHandler, defaultHome } from './get-home-channel'

const HomeStore = require('electron-store')

// Mock event.reply
const mockEventReply = jest.fn()
const mockEvent = { reply: mockEventReply }
// Mock electron-store
jest.mock('electron-store')

describe('getHomeEventHandler', () => {
  afterEach(() => jest.clearAllMocks())

  it('empty store', async () => {
    HomeStore.mockImplementation(() => ({ get: () => undefined }))

    const params = {}
    await eventHandlerWrapper('GET_HOME', getHomeEventHandler)(mockEvent, params)

    expect(mockEventReply.mock.calls.length).toBe(1)
    expect(mockEventReply.mock.calls[0][0]).toEqual('GET_HOME')
    expect(mockEventReply.mock.calls[0][1]).toEqual(defaultHome)
  })

  it('store with value', async () => {
    HomeStore.mockImplementation(() => ({ get: () => 'value' }))

    const params = {}
    await eventHandlerWrapper('GET_HOME', getHomeEventHandler)(mockEvent, params)

    expect(mockEventReply.mock.calls.length).toBe(1)
    expect(mockEventReply.mock.calls[0][0]).toEqual('GET_HOME')
    expect(mockEventReply.mock.calls[0][1]).toEqual('value')
  })
})
