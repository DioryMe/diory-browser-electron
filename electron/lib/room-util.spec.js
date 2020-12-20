import { handleGetRoomEvent } from './room-util'

const fs = require('fs')

const mockEventSenderSend = jest.fn()

const mockEvent = { sender: { send: mockEventSenderSend } }

describe('handleGetRoomEvent', () => {
  it('works', async () => {
    const exampleFolderPath =
      '/Users/Jouni/Code/diory-browser-electron/public/development-content-room'
    const params = { address: exampleFolderPath }

    await handleGetRoomEvent(mockEvent, params)

    const diographJSONRawContents = fs.readFileSync(`${exampleFolderPath}/diograph.json`)
    const diographObject = JSON.parse(diographJSONRawContents)
    const returnValue = { diograph: diographObject }

    expect(mockEventSenderSend.mock.calls.length).toBe(1)
    expect(mockEventSenderSend.mock.calls[0][0]).toEqual('GET_ROOM')
    expect(mockEventSenderSend.mock.calls[0][1]).toEqual(returnValue)
  })
})
