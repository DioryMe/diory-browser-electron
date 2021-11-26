const { eventHandlerWrapper } = require('./channel-util')
const { saveDiographJson } = require('./save-diograph-json')

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

  describe.skip('when saveDiographJson resolves properly', () => {
    beforeEach(() => {
      saveDiographJson.mockResolvedValue(undefined)
    })
    it('returns true', async () => {
      const response = await eventHandlerWrapper('SAVE_ROOM', saveDiographJson)(params)

      expect(saveDiographJson).toHaveBeenCalledTimes(1)
      expect(saveDiographJson).toHaveBeenCalledWith(
        params.path,
        params.room.diograph,
        'root-diory-id'
      )

      expect(response).toEqual(true)
    })
  })

  describe.skip('when saveDiographJson rejects', () => {
    beforeEach(() => {
      saveDiographJson.mockRejectedValue(new Error('some-error'))
    })

    it('returns Error', async () => {
      const response = await eventHandlerWrapper('SAVE_ROOM', saveDiographJson)(params)

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
