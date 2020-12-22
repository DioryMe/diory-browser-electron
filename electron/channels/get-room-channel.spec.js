import { handleEvent } from './handle-event'
import { getRoomEventHandler } from './get-room-channel'

const fs = require('fs')

const mockEventReply = jest.fn()
const mockEvent = { reply: mockEventReply }

describe('getRoomEventHandler', () => {
  it('works', async () => {
    const exampleFolderPath =
      '/Users/Jouni/Code/diory-browser-electron/public/development-content-room'
    const params = { address: exampleFolderPath }

    await handleEvent(getRoomEventHandler)(mockEvent, params)

    const diographJSONRawContents = fs.readFileSync(`${exampleFolderPath}/diograph.json`)
    const diographObject = JSON.parse(diographJSONRawContents)
    const returnValue = { diograph: diographObject }

    expect(mockEventReply.mock.calls.length).toBe(1)
    expect(mockEventReply.mock.calls[0][0]).toEqual('GET_ROOM')
    expect(mockEventReply.mock.calls[0][1]).toEqual(returnValue)
  })
})
