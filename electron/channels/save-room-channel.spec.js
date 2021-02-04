const { eventHandlerWrapper } = require('./channel-util')
const { saveRoomEventHandler } = require('./save-room-channel')
const { saveRoom } = require('../lib/room-util')

// Mock event.reply
const mockEventReply = jest.fn()
const mockEvent = { reply: mockEventReply }
// Mock saveRoom
jest.mock('../lib/room-util')

const params = {
  path: 'some-path',
  room: {
    id: 'some-id',
    diograph: 'some-diograph',
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

  // Fails with watch but passes with yarn test-electron
  it.skip("'null, err' if Promise rejects", async () => {
    const saveRoomMock = saveRoom.mockRejectedValue(new Error('this is an error'))

    const response = await eventHandlerWrapper('SAVE_ROOM', saveRoomEventHandler)(mockEvent, params)
    await saveRoomMock

    expect(saveRoom).toHaveBeenCalledTimes(1)
    expect(saveRoom).toHaveBeenCalledWith(params.path, params.room.diograph)

    expect(response).toEqual(new Error('this is an error'))
  })
})
