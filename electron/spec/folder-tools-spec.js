const FolderTools = require('../lib/diograph-folder-tools')
const path = require('path')

describe('listFiles', () => {

  it('prints out', async function() {
    let folderPath = path.join(__dirname, 'example-folder')
    let expectedFileList = [
      path.join(__dirname, 'example-folder', '.DS_Store'),
      path.join(__dirname, 'example-folder', 'Shopping @ Tampere/socks.jpg'),
      path.join(__dirname, 'example-folder', 'Shopping @ Tampere'),
      path.join(__dirname, 'example-folder', 'car.jpg'),
      path.join(__dirname, 'example-folder', 'example.jpg'),
      path.join(__dirname, 'example-folder', 'some-other-file.txt'),
      path.join(__dirname, 'example-folder')
    ]
    let fileList = await FolderTools.listFiles(folderPath)
    expect(fileList).toEqual(expectedFileList)
  })

  it('throws an error if non-directory given', async function() {
    let nonFolderPath = path.join(__dirname, 'definitely-not-a-folder')
    let fileList = await FolderTools.listFiles(nonFolderPath)
    expect(fileList).toEqual(undefined)
  })

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
      name: 'example-folder',
      diories: [
        {
          name: 'example.jpg',
          dateStart: '2008:11:01 21:15:11',
          latitude: 43.464455,
          longitude: 11.881478333333334
        },
        {
          name: 'some-other-file.txt'
        }
      ]
    }
    FolderTools.generateDiographJSON('example-folder').then(diographJSON => {
      expect(expectedDiographJSON).toEqual(diographJSON)
    })
  })

})
