jest.mock('fs', () => ({
  promises: {
    writeFile: jest.fn().mockResolvedValue(),
  },
}))

const fs = require('fs')
const { saveDiograph } = require('./save-diograph')

const mockedDiograph = {
  rootId: 'some-diory',
  diograph: {
    'some-diory': { id: 'some-diory' },
  },
}

describe('saveDiograph', () => {
  it('calls writeFile with correct params', async () => {
    const dioryFolderLocation = '/some/path'
    const prettyPrintedJson = JSON.stringify(mockedDiograph, null, 2)

    await saveDiograph(dioryFolderLocation, mockedDiograph)

    expect(fs.promises.writeFile).toHaveBeenCalledTimes(1)
    expect(fs.promises.writeFile).toHaveBeenCalledWith(
      '/some/path/diograph.json',
      prettyPrintedJson
    )
  })
})
