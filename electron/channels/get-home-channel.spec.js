// import { handleEvent } from './handle-event'
import { handleGetHomeEvent, defaultHome } from './get-home-channel'

const HomeStore = require('electron-store')

// Mock event.reply
const mockEventReply = jest.fn()
const mockEvent = { reply: mockEventReply }

// Mock electron-store
jest.genMockFromModule('electron-store')
jest.mock('electron-store')

describe('handleGetHomeEvent', () => {
  afterEach(() => jest.clearAllMocks())

  it('empty store', async () => {
    HomeStore.mockImplementation(() => ({ get: () => undefined }))

    const params = {}
    await handleGetHomeEvent(mockEvent, params)
    // await handleEvent(handleGetHomeEvent)(mockEvent, params)

    expect(mockEventReply.mock.calls.length).toBe(1)
    expect(mockEventReply.mock.calls[0][0]).toEqual(defaultHome)
  })

  it('store with value', async () => {
    HomeStore.mockImplementation(() => ({ get: () => 'value' }))

    const params = {}
    await handleGetHomeEvent(mockEvent, params)
    // await handleEvent(handleGetHomeEvent)(mockEvent, params)

    expect(mockEventReply.mock.calls.length).toBe(1)
    expect(mockEventReply.mock.calls[0][0]).toEqual('value')
  })
})
