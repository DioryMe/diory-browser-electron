const FolderTools = require('../lib/diograph-folder-tools')
const path = require('path')

function testAsync(runAsync) {
  return (done) => {
    runAsync().then(done, e => { fail(e); done(); });
  };
}

describe('listFiles', () => {

  it('prints out', testAsync(async function() {
    const folderPath = path.join(__dirname, 'example-folder')
    let fileList = await FolderTools.listFiles(folderPath)

    const expectedFolderFiles = [
      { filePath: path.join(__dirname, 'example-folder', 'Shopping @ Tampere/socks.jpg') },
      { filePath: path.join(__dirname, 'example-folder', 'Shopping @ Tampere'),
        links: [ { filePath: '/Users/op/2019/diory-browser-electron/electron/spec/example-folder/Shopping @ Tampere/socks.jpg' } ]
      },
      { filePath: path.join(__dirname, 'example-folder', 'car.jpg') },
      { filePath: path.join(__dirname, 'example-folder', 'example.jpg') },
      { filePath: path.join(__dirname, 'example-folder', 'some-other-file.txt') },
    ]
    const expectedFolder = {
      filePath: path.join(__dirname, 'example-folder'),
      links: expectedFolderFiles
    }

    expect(fileList).toEqual([...expectedFolderFiles, expectedFolder])
  }))

  it('throws an error if non-directory given', testAsync(async function() {
    let nonFolderPath = path.join(__dirname, 'definitely-not-a-folder')
    let fileList = await FolderTools.listFiles(nonFolderPath)
    expect(fileList).toEqual(undefined)
  }))

})


describe('generateRoom', () => {
  it('generates room from folder path', () => {
    // Mock listFiles
    let shortenedFileList = [
      path.join(__dirname, 'example-folder', 'example.jpg'),
      path.join(__dirname, 'example-folder', 'some-other-file.txt'),
    ]
    spyOn(FolderTools, 'listFiles').and.returnValue(shortenedFileList)

    let expectedDiographJSON = {
      id: 'example-folder',
      text: 'example-folder',
    }
    FolderTools.generateRoom('example-folder').then(diographJSON => {
      expect(expectedDiographJSON).toEqual(diographJSON)
    })
  })
})

describe('generateDiograph', () => {
  it('generated diograph on folder path', () => {
    // Mock listFiles
    const shortenedFileList = [
      { filePath: path.join(__dirname, 'example-folder', 'example.jpg') },
      { filePath: path.join(__dirname, 'example-folder', 'some-other-file.txt') },
    ]
    spyOn(FolderTools, 'listFiles').and.returnValue(shortenedFileList)

    let expectedDiographJSON = {
      '2008-11-01T21:15:11.000Z': {
        id: '2008-11-01T21:15:11.000Z',
        image: '/Users/op/2019/diory-browser-electron/electron/spec/example-folder/example.jpg',
        date: '2008-11-01T21:15:11.000Z',
        latitude: 43.464455,
        longitude: 11.881478333333334
      },
      '/Users/op/2019/diory-browser-electron/electron/spec/example-folder/some-other-file.txt': {
        id: '/Users/op/2019/diory-browser-electron/electron/spec/example-folder/some-other-file.txt',
        text: 'some-other-file.txt'
      }
    }
    FolderTools.generateDiograph('example-folder').then(diographJSON => {
      expect(expectedDiographJSON).toEqual(diographJSON)
    })
  })
})
