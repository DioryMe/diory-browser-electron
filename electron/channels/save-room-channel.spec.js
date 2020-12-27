import { eventHandlerWrapper } from './channel-util'
import { saveRoomEventHandler } from './save-room-channel'
import { saveRoom } from '../lib/room-util'

// Mock event.reply
const mockEventReply = jest.fn()
const mockEvent = { reply: mockEventReply }
// Mock saveRoom
jest.mock('../lib/room-util')

const params = {
  path: 'this is a file path',
  room: {
    id: 'this is room id',
    diograph: 'this is diograph to be saved',
  },
}

describe('saveRoomEventHandler sends event with payload ', () => {
  afterEach(() => jest.clearAllMocks())

  it("'true, undefined' if Promise resolves", async () => {
    saveRoom.mockImplementation(() => Promise.resolve(undefined))

    // await saveRoomEventHandler(mockEvent, params)
    await eventHandlerWrapper(saveRoomEventHandler)(mockEvent, params)

    await expect(saveRoom).toHaveBeenCalledTimes(1)
    expect(saveRoom).toHaveBeenCalledWith(params.path, params.room.diograph)

    expect(mockEventReply.mock.calls.length).toBe(1)
    expect(mockEventReply.mock.calls[0][0]).toEqual('SAVE_ROOM')
    expect(mockEventReply.mock.calls[0][1]).toEqual(true)
    expect(mockEventReply.mock.calls[0][2]).toEqual(undefined)
  })

  it("'null, err' if Promise rejects", async () => {
    saveRoom.mockImplementation(() => Promise.reject(new Error('this is an error')))

    // await saveRoomEventHandler(mockEvent, params)
    await eventHandlerWrapper(saveRoomEventHandler)(mockEvent, params)

    // WTF is this `await expect` => with this it works!
    await expect(saveRoom).toHaveBeenCalledTimes(1)
    expect(saveRoom).toHaveBeenCalledWith(params.path, params.room.diograph)

    expect(mockEventReply.mock.calls.length).toBe(1)
    expect(mockEventReply.mock.calls[0][0]).toEqual('SAVE_ROOM')
    expect(mockEventReply.mock.calls[0][1].message).toEqual('this is an error')
  })
})
