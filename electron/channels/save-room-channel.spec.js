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
    rootId: 'root-diory-id',
    diograph: 'some-diograph',
  },
}

describe('saveRoomEventHandler', () => {
  describe('when saveDiographJSON resolves properly', () => {
    let saveDiographJSONMock
    beforeEach(() => {
      saveDiographJSONMock = saveDiographJSON.mockResolvedValue(undefined)
    })
    it('returns true', async () => {
      const response = await eventHandlerWrapper('SAVE_ROOM', saveRoomEventHandler)(
        mockEvent,
        params
      )
      await saveDiographJSONMock

      expect(saveDiographJSON).toHaveBeenCalledTimes(1)
      expect(saveDiographJSON).toHaveBeenCalledWith(
        params.path,
        params.room.diograph,
        'root-diory-id'
      )

      expect(response).toEqual(true)
    })
  })

  describe('when saveDiographJSON rejects', () => {
    let saveDiographJSONMock
    beforeEach(() => {
      saveDiographJSONMock = saveDiographJSON.mockRejectedValue(new Error('some-error'))
    })
    it.skip('returns Error', async () => {
      const response = await eventHandlerWrapper('SAVE_ROOM', saveRoomEventHandler)(
        mockEvent,
        params
      )
      await saveDiographJSONMock

      expect(saveDiographJSON).toHaveBeenCalledTimes(1)
      expect(saveDiographJSON).toHaveBeenCalledWith(
        params.path,
        params.room.diograph,
        'root-diory-id'
      )

      expect(response).toEqual(new Error('some-error'))
    })
  })
})
