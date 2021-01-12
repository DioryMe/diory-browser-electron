const HomeStore = require('electron-store')
const { eventHandlerWrapper } = require('./channel-util')
const getHomeChannel = require('./get-home-channel')

const { getHomeEventHandler, defaultHome } = getHomeChannel

// Mock event.reply
const mockEventReply = jest.fn()
const mockEvent = { reply: mockEventReply }
// Mock electron-store
jest.mock('electron-store')

const homeJSON = {
  rooms: {
    'development-content-room': {
      id: 'development-content-room',
    },
  },
  connections: {
    './public/development-content-room': {
      room: 'development-content-room',
      connector: 'file',
    },
  },
  focus: {
    roomId: 'development-content-room',
    dioryId: 'development-content-room',
  },
  errors: [],
}

describe('getHomeEventHandler', () => {
  beforeEach(() => {
    // Mock roomConnectionOK
    getHomeChannel.roomConnectionOK = jest.fn(() => true)
  })

  it('empty store', async () => {
    HomeStore.mockImplementation(() => ({ get: () => undefined }))

    const params = {}
    const response = await eventHandlerWrapper('GET_HOME', getHomeEventHandler)(mockEvent, params)

    expect(response).toEqual(defaultHome)
  })

  it('store with value', async () => {
    HomeStore.mockImplementation(() => ({ get: () => homeJSON }))

    const params = {}
    const response = await eventHandlerWrapper('GET_HOME', getHomeEventHandler)(mockEvent, params)

    expect(response).toEqual(homeJSON)
  })

  it('invalid file path', async () => {
    HomeStore.mockImplementation(() => ({ get: () => homeJSON }))
    // Mock roomConnectionOK to return false
    getHomeChannel.roomConnectionOK = jest.fn(() => false)

    const params = {}
    const response = await eventHandlerWrapper('GET_HOME', getHomeEventHandler)(mockEvent, params)

    // Expect 'errors' to be added to the response
    const homeJSONWithErrors = homeJSON
    homeJSONWithErrors.errors = ['./public/development-content-room']
    expect(response).toEqual(homeJSONWithErrors)
  })
})
