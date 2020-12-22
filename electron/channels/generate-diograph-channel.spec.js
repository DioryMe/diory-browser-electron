// import { eventHandlerWrapper } from './channel-util'
import { generateDiographEventHandler } from './generate-diograph-channel'
import { generateDiograph } from '../generators/diograph-generator'
import { saveRoom } from '../lib/room-util'

// Mock event.reply
const mockEventReply = jest.fn()
const mockEvent = { reply: mockEventReply }
// Mock generateDiograph
jest.mock('../generators/diograph-generator')
generateDiograph.mockImplementation(() =>
  Promise.resolve({ id: 'this', diograph: 'is generated diograph' })
)
// Mock saveRoom
jest.mock('../lib/room-util')
saveRoom.mockImplementation(() => Promise.resolve(undefined))

describe('generateDiographEventHandler', () => {
  it('sends event with generateDiograph return value', async () => {
    const params = 'this is a file path'
    await generateDiographEventHandler(mockEvent, params)
    // await eventHandlerWrapper(generateDiographEventHandler)(mockEvent, params)

    expect(generateDiograph).toHaveBeenCalledTimes(1)
    expect(generateDiograph).toHaveBeenCalledWith(params)

    // WTF is this `await expect` => with this it works!
    await expect(saveRoom).toHaveBeenCalledTimes(1)
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
