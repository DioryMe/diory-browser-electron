// import { eventHandlerWrapper } from './channel-util'
import { generateDiographEventHandler } from './generate-diograph-channel'
import { generateDiograph } from '../generators/diograph-generator'

// Mock event.reply
const mockEventReply = jest.fn()
const mockEvent = { reply: mockEventReply }
jest.mock('../generators/diograph-generator')
generateDiograph.mockImplementation(
  () =>
    new Promise((resolve, reject) => {
      resolve('this is generated diograph')
    })
)

describe('generateDiographEventHandler', () => {
  it('sends event with generateDiograph return value', async () => {
    const params = 'this is a file path'
    await generateDiographEventHandler(mockEvent, params)
    // await eventHandlerWrapper(generateDiographEventHandler)(mockEvent, params)

    expect(generateDiograph).toHaveBeenCalledTimes(1)
    expect(generateDiograph).toHaveBeenCalledWith(params)

    expect(mockEventReply.mock.calls.length).toBe(1)
    expect(mockEventReply.mock.calls[0][0]).toEqual('GENERATE_DIOGRAPH')
    expect(mockEventReply.mock.calls[0][1]).toEqual({ diograph: 'this is generated diograph' })
  })
})
