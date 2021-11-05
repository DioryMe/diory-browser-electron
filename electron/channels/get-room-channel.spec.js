const fs = require('fs')
const { eventHandlerWrapper } = require('./channel-util')
const { getRoomEventHandler } = require('./get-room-channel')

describe('getRoomEventHandler', () => {
  it('works', async () => {
    const exampleFolderPath = './public/diory-demo-content'
    const params = { address: exampleFolderPath }

    const response = await eventHandlerWrapper('GET_ROOM', getRoomEventHandler)(params)

    const diographJsonRawContents = fs.readFileSync(`${exampleFolderPath}/diograph.json`)
    const diographObject = JSON.parse(diographJsonRawContents)
    const returnValue = {
      folderLocation: './public/diory-demo-content',
      rootId: diographObject.rootId,
      diograph: diographObject.diograph,
    }

    expect(response).toEqual(returnValue)
  })

  it('doesnt work', async () => {
    const exampleFolderPath = './electron/readers/example-folder'
    const params = { address: exampleFolderPath }

    const response = await eventHandlerWrapper('GET_ROOM', getRoomEventHandler)(params)

    expect(response).toEqual(undefined)
  })
})
