const { eventHandlerWrapper } = require('./channel-util')
const { saveRoomEventHandler } = require('./save-room-channel')
const { saveDiographJSON } = require('../lib/room-util')

// Mock event.reply
const mockEventReply = jest.fn()
const mockEvent = { reply: mockEventReply }
// Mock saveDiographJSON
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
    const saveDiographJSONMock = saveDiographJSON.mockResolvedValue(undefined)

    const response = await eventHandlerWrapper('SAVE_ROOM', saveRoomEventHandler)(mockEvent, params)
    await saveDiographJSONMock

    expect(saveDiographJSON).toHaveBeenCalledTimes(1)
    expect(saveDiographJSON).toHaveBeenCalledWith(params.path, params.room.diograph)

    expect(response).toEqual(true)
  })

  // Fails with watch but passes with yarn test-electron
  it.skip("'null, err' if Promise rejects", async () => {
    const saveDiographJSON = saveDiographJSON.mockRejectedValue(new Error('this is an error'))

    const response = await eventHandlerWrapper('SAVE_ROOM', saveRoomEventHandler)(mockEvent, params)
    await saveDiographJSON

    expect(saveDiographJSON).toHaveBeenCalledTimes(1)
    expect(saveDiographJSON).toHaveBeenCalledWith(params.path, params.room.diograph)

    expect(response).toEqual(new Error('this is an error'))
  })
})
