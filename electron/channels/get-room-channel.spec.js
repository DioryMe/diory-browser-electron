const fs = require('fs')
const { eventHandlerWrapper } = require('./channel-util')
const { getRoomEventHandler } = require('./get-room-channel')

const mockEventReply = jest.fn()
const mockEvent = { reply: mockEventReply }

describe('getRoomEventHandler', () => {
  it('works', async () => {
    const exampleFolderPath = './public/development-content-room'
    const params = { address: exampleFolderPath }

    const response = await eventHandlerWrapper('GET_ROOM', getRoomEventHandler)(mockEvent, params)

    const diographJSONRawContents = fs.readFileSync(`${exampleFolderPath}/diograph.json`)
    const diographObject = JSON.parse(diographJSONRawContents)
    const returnValue = { rootId: diographObject.rootId, diograph: diographObject.diograph }

    expect(response).toEqual(returnValue)
  })
})
