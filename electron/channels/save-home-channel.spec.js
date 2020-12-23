// import { eventHandlerWrapper } from './channel-util'
import { saveHomeEventHandler } from './save-home-channel'

const HomeStore = require('electron-store')

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
    await saveHomeEventHandler(mockEvent, params)
    // await eventHandlerWrapper(saveHomeEventHandler)(mockEvent, params)

    expect(mockHomeStoreSet.mock.calls.length).toBe(1)
    expect(mockHomeStoreSet.mock.calls[0][0]).toEqual({ home: params })

    expect(mockEventReply.mock.calls.length).toBe(1)
    expect(mockEventReply.mock.calls[0][0]).toEqual('SAVE_HOME')
    expect(mockEventReply.mock.calls[0][1]).toEqual(true)
  })
})
