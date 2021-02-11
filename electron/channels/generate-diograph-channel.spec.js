const { eventHandlerWrapper } = require('./channel-util')
const { generateDiographEventHandler } = require('./generate-diograph-channel')
const { generateDiograph } = require('../generators/diograph-generator')
const { saveDiographJson, readDiographJson } = require('../lib/room-util')

// Mock event.reply
const mockEventReply = jest.fn()
const mockEvent = { reply: mockEventReply }
// Mock generateDiograph
jest.mock('../generators/diograph-generator')
const generateDiographMock = generateDiograph.mockResolvedValue({
  rootId: 'some-diory-id',
  diograph: 'some-diograph',
})
// Mock saveDiographJson
jest.mock('../lib/room-util')
const saveDiographJsonMock = saveDiographJson.mockResolvedValue(undefined)

describe('generateDiographEventHandler', () => {
  describe('if diograph.json not found', () => {
    beforeEach(() => {
      readDiographJson.mockReturnValue({ rootId: undefined, diograph: undefined })
    })

    it('return generateDiograph return value', async () => {
      const params = 'some-path'

      // Trigger event handler and await for mocked promises to resolve before expects
      const response = await eventHandlerWrapper('GENERATE_DIOGRAPH', generateDiographEventHandler)(
        mockEvent,
        params
      )
      await generateDiographMock
      await saveDiographJsonMock

      expect(generateDiograph).toHaveBeenCalledTimes(1)
      expect(generateDiograph).toHaveBeenCalledWith(params)

      expect(saveDiographJson).toHaveBeenCalledTimes(1)
      expect(saveDiographJson).toHaveBeenCalledWith(params, 'some-diograph', 'some-diory-id')

      const responseObject = {
        rootId: 'some-diory-id',
        diograph: 'some-diograph',
        path: 'some-path',
      }
      expect(response).toEqual(responseObject)
    })
  })

  describe('if diograph.json found', () => {
    const someDiograph = {
      rootId: 'some-diory-id',
      diograph: { 'some-diory-id': 'some-diory-object' },
    }

    beforeEach(() => {
      readDiographJson.mockReturnValue({ rootId: 'some-diory-id', diograph: someDiograph })
    })

    it('return readDiographJson return value', async () => {
      const params = 'some-path'

      const response = await eventHandlerWrapper('GENERATE_DIOGRAPH', generateDiographEventHandler)(
        mockEvent,
        params
      )

      const responseObject = {
        rootId: 'some-diory-id',
        diograph: someDiograph,
        path: 'some-path',
      }
      expect(response).toEqual(responseObject)
    })
  })
})
