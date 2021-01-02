const { eventHandlerWrapper } = require('./channel-util')
const { saveRoomEventHandler } = require('./save-room-channel')
const { saveRoom } = require('../lib/room-util')

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
  it("'true, undefined' if Promise resolves", async () => {
    const saveRoomMock = saveRoom.mockResolvedValue(undefined)

    const response = await eventHandlerWrapper('SAVE_ROOM', saveRoomEventHandler)(mockEvent, params)
    await saveRoomMock

    expect(saveRoom).toHaveBeenCalledTimes(1)
    expect(saveRoom).toHaveBeenCalledWith(params.path, params.room.diograph)

    expect(response).toEqual(true)
  })

  it("'null, err' if Promise rejects", async () => {
    const saveRoomMock = saveRoom.mockRejectedValue(new Error('this is an error'))

    const response = await eventHandlerWrapper('SAVE_ROOM', saveRoomEventHandler)(mockEvent, params)
    await saveRoomMock

    expect(saveRoom).toHaveBeenCalledTimes(1)
    expect(saveRoom).toHaveBeenCalledWith(params.path, params.room.diograph)

    expect(response).toEqual(new Error('this is an error'))
  })
})
