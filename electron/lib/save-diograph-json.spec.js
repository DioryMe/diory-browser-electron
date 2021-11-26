jest.mock('fs', () => ({
  promises: {
    writeFile: jest.fn().mockResolvedValue(),
  },
}))

const fs = require('fs')
const { saveDiographJson } = require('./save-diograph-json')

const mockedReadDiographJsonValue = {
  rootId: 'some-diory',
  diograph: {
    'some-diory': { id: 'some-diory' },
  },
}

describe('saveDiographJson', () => {
  it('calls writeFile with correct params', async () => {
    const dioryFolderLocation = '/some/path'
    const prettyPrintedJson = JSON.stringify(mockedReadDiographJsonValue, null, 2)

    await saveDiographJson({ dioryFolderLocation, ...mockedReadDiographJsonValue })

    expect(fs.promises.writeFile).toHaveBeenCalledTimes(1)
    expect(fs.promises.writeFile).toHaveBeenCalledWith(
      '/some/path/diograph.json',
      prettyPrintedJson
    )
  })
})
