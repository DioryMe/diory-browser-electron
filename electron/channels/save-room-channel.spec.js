const { eventHandlerWrapper } = require('./channel-util')
const { saveRoomEventHandler } = require('./save-room-channel')
const { saveDiographJson } = require('../lib/room-util')

// Mock event.reply
const mockEventReply = jest.fn()
const mockEvent = { reply: mockEventReply }
// Mock saveDiographJson
jest.mock('../lib/room-util')

const params = {
  path: 'some-path',
  room: {
    rootId: 'root-diory-id',
    diograph: 'some-diograph',
  },
}

describe('saveRoomEventHandler', () => {
  describe('when saveDiographJson resolves properly', () => {
    let saveDiographJsonMock
    beforeEach(() => {
      saveDiographJsonMock = saveDiographJson.mockResolvedValue(undefined)
    })
    it('returns true', async () => {
      const response = await eventHandlerWrapper('SAVE_ROOM', saveRoomEventHandler)(
        mockEvent,
        params
      )
      await saveDiographJsonMock

      expect(saveDiographJson).toHaveBeenCalledTimes(1)
      expect(saveDiographJson).toHaveBeenCalledWith(
        params.path,
        params.room.diograph,
        'root-diory-id'
      )

      expect(response).toEqual(true)
    })
  })

  describe('when saveDiographJson rejects', () => {
    let saveDiographJsonMock
    beforeEach(() => {
      saveDiographJsonMock = saveDiographJson.mockRejectedValue(new Error('some-error'))
    })
    it.skip('returns Error', async () => {
      const response = await eventHandlerWrapper('SAVE_ROOM', saveRoomEventHandler)(
        mockEvent,
        params
      )
      await saveDiographJsonMock

      expect(saveDiographJson).toHaveBeenCalledTimes(1)
      expect(saveDiographJson).toHaveBeenCalledWith(
        params.path,
        params.room.diograph,
        'root-diory-id'
      )

      expect(response).toEqual(new Error('some-error'))
    })
  })
})
