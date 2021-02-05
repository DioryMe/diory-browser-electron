const { eventHandlerWrapper } = require('./channel-util')
const { generateDiographEventHandler } = require('./generate-diograph-channel')
const { generateDiograph } = require('../generators/diograph-generator')
const { saveDiographJSON, readDiographJSON } = require('../lib/room-util')

// Mock event.reply
const mockEventReply = jest.fn()
const mockEvent = { reply: mockEventReply }
// Mock generateDiograph
jest.mock('../generators/diograph-generator')
const generateDiographMock = generateDiograph.mockResolvedValue({
  id: 'some-id',
  diograph: 'some-diograph',
})
// Mock saveDiographJSON
jest.mock('../lib/room-util')
const saveDiographJSONMock = saveDiographJSON.mockResolvedValue(undefined)

describe('generateDiographEventHandler', () => {
  describe('if diograph.json not found', () => {
    beforeEach(() => {
      readDiographJSON.mockReturnValue({ diograph: undefined })
    })

    it('return generateDiograph return value', async () => {
      const params = 'some-path'

      // Trigger event handler and await for mocked promises to resolve before expects
      const response = await eventHandlerWrapper('GENERATE_DIOGRAPH', generateDiographEventHandler)(
        mockEvent,
        params
      )
      await generateDiographMock
      await saveDiographJSONMock

      expect(generateDiograph).toHaveBeenCalledTimes(1)
      expect(generateDiograph).toHaveBeenCalledWith(params)

      expect(saveDiographJSON).toHaveBeenCalledTimes(1)
      expect(saveDiographJSON).toHaveBeenCalledWith(params, 'some-diograph')

      const responseObject = {
        id: 'some-id',
        diograph: 'some-diograph',
        path: 'some-path',
      }
      expect(response).toEqual(responseObject)
    })
  })

  describe('if diograph.json found', () => {
    beforeEach(() => {
      readDiographJSON.mockReturnValue({ diograph: 'some-diograph' })
    })

    it('return readDiographJSON return value', async () => {
      const params = 'some-path'

      const response = await eventHandlerWrapper('GENERATE_DIOGRAPH', generateDiographEventHandler)(
        mockEvent,
        params
      )

      const responseObject = {
        id: 'some-id',
        diograph: 'some-diograph',
        path: 'some-path',
      }
      expect(response).toEqual(responseObject)
    })
  })
})
