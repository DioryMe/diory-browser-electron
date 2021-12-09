const fs = require('fs')
const path = require('path').posix
const { saveDiograph } = require('./save-diograph')

const someDiograph = {
  rootId: 'some-diory',
  diograph: {
    'some-diory': { id: 'some-diory' },
  },
}

jest.mock('fs', () => ({
  promises: {
    writeFile: jest.fn().mockResolvedValue(),
  },
}))

describe('saveDiograph', () => {
  it('calls writeFile with correct params', async () => {
    const dioryFolderLocation = '/some/path'
    const prettyPrintedJson = JSON.stringify(someDiograph, null, 2)

    await saveDiograph({ dioryFolderLocation, ...someDiograph })

    expect(fs.promises.writeFile).toHaveBeenCalledTimes(1)
    expect(fs.promises.writeFile).toHaveBeenCalledWith(
      path.join(dioryFolderLocation, 'diograph.json'),
      prettyPrintedJson
    )
  })
})
