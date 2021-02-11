const { eventHandlerWrapper } = require('./channel-util')
const { saveRoomEventHandler } = require('./save-room-channel')
const { saveDiographJson } = require('../lib/save-diograph-json')

// Mock event.reply
const mockEventReply = jest.fn()
const mockEvent = { reply: mockEventReply }
// Mock saveDiographJson
jest.mock('../lib/save-diograph-json')

describe('saveRoomEventHandler', () => {
  let params

  beforeEach(() => {
    params = {
      path: 'some-path',
      room: {
        rootId: 'root-diory-id',
        diograph: 'some-diograph',
      },
    }
  })

  describe('when saveDiographJson resolves properly', () => {
    beforeEach(() => {
      saveDiographJson.mockResolvedValue(undefined)
    })
    it('returns true', async () => {
      const response = await eventHandlerWrapper('SAVE_ROOM', saveRoomEventHandler)(
        mockEvent,
        params
      )

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
    beforeEach(() => {
      saveDiographJson.mockRejectedValue(new Error('some-error'))
    })

    it.skip('returns Error', async () => {
      const response = await eventHandlerWrapper('SAVE_ROOM', saveRoomEventHandler)(
        mockEvent,
        params
      )

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
