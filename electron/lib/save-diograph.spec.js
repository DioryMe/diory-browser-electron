const fs = require('fs')
const { saveDiograph } = require('./save-diograph')

const someDiograph = {
  rootId: 'some-diory',
  diograph: {
    'some-diory': { id: 'some-diory' },
  },
}

// For some reason this maybe should be placed on top of the file
// - https://stackoverflow.com/questions/64947786/how-to-mock-fs-promises-writefile-with-jest#comment114826489_64948126
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
      '/some/path/diograph.json',
      prettyPrintedJson
    )
  })
})
