const FolderTools = require('../lib/diograph-folder-tools')
const path = require('path')

function testAsync(runAsync) {
  return (done) => {
    runAsync().then(done, e => { fail(e); done(); });
  };
}

describe('listFiles', () => {

  it('prints out', testAsync(async function() {
    let folderPath = path.join(__dirname, 'example-folder')
    let expectedFileList = [
      path.join(__dirname, 'example-folder', 'Shopping @ Tampere/socks.jpg'),
      path.join(__dirname, 'example-folder', 'Shopping @ Tampere'),
      path.join(__dirname, 'example-folder', 'car.jpg'),
      path.join(__dirname, 'example-folder', 'example.jpg'),
      path.join(__dirname, 'example-folder', 'some-other-file.txt'),
      path.join(__dirname, 'example-folder')
    ]
    let fileList = await FolderTools.listFiles(folderPath)
    expect(fileList).toEqual(expectedFileList)
  }))

  it('throws an error if non-directory given', testAsync(async function() {
    let nonFolderPath = path.join(__dirname, 'definitely-not-a-folder')
    let fileList = await FolderTools.listFiles(nonFolderPath)
    expect(fileList).toEqual(undefined)
  }))

})


describe('generateDiographJSON', () => {

  it('works', () => {
    // Mock listFiles
    let shortenedFileList = [
      path.join(__dirname, 'example-folder', 'example.jpg'),
      path.join(__dirname, 'example-folder', 'some-other-file.txt'),
    ]
    spyOn(FolderTools, 'listFiles').and.returnValue(shortenedFileList)

    let expectedDiographJSON = {
      id: 'example-folder',
      diograph: [
        {
          id: '2008-11-01T21:15:11.000Z',
          image: '/Users/op/2019/diory-browser-electron/electron/spec/example-folder/example.jpg',
          date: '2008-11-01T21:15:11.000Z',
          latitude: 43.464455,
          longitude: 11.881478333333334
        },
        {
          id: '/Users/op/2019/diory-browser-electron/electron/spec/example-folder/some-other-file.txt',
          text: 'some-other-file.txt'
        }
      ]
    }
    FolderTools.generateRoom('example-folder').then(diographJSON => {
      expect(expectedDiographJSON).toEqual(diographJSON)
    })
  })

})
