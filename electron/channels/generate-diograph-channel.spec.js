const { eventHandlerWrapper } = require('./channel-util')
const { generateDiographEventHandler } = require('./generate-diograph-channel')
const { generateDiograph } = require('../generators/diograph-generator')
const { saveRoom } = require('../lib/room-util')

// Mock event.reply
const mockEventReply = jest.fn()
const mockEvent = { reply: mockEventReply }
// Mock generateDiograph
jest.mock('../generators/diograph-generator')
const generateDiographMock = generateDiograph.mockResolvedValue({
  id: 'this',
  diograph: 'is generated diograph',
})
// Mock saveRoom
jest.mock('../lib/room-util')
const saveRoomMock = saveRoom.mockResolvedValue(undefined)

describe('generateDiographEventHandler', () => {
  it('sends event with generateDiograph return value', async () => {
    const params = 'this is a file path'

    // Trigger event handler and await for mocked promises to resolve before expects
    await eventHandlerWrapper('GENERATE_DIOGRAPH', generateDiographEventHandler)(mockEvent, params)
    await generateDiographMock
    await saveRoomMock

    expect(generateDiograph).toHaveBeenCalledTimes(1)
    expect(generateDiograph).toHaveBeenCalledWith(params)

    expect(saveRoom).toHaveBeenCalledTimes(1)
    expect(saveRoom).toHaveBeenCalledWith(params, 'is generated diograph')

    expect(mockEventReply.mock.calls.length).toBe(1)
    expect(mockEventReply.mock.calls[0][0]).toEqual('GENERATE_DIOGRAPH')
    const responseObject = {
      id: 'this',
      diograph: 'is generated diograph',
      path: 'this is a file path',
    }
    expect(mockEventReply.mock.calls[0][1]).toEqual(responseObject)
  })
})
