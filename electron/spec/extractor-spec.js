const Extractor = require('../lib/diograph-extractor')
const path = require('path')

describe('getDiry', () => {

  it('works with image', () => {
    let imagePath = path.join(__dirname, 'example-folder/example.jpg')
    let diograph = Extractor.createDiory(imagePath)
    let expectedObject = {
      id: '2008-11-01T21:15:11.000Z',
      date: '2008-11-01T21:15:11.000Z',
      image: imagePath,
      latitude: 43.464455,
      longitude: 11.881478333333334
    }
    expect(diograph).toEqual(expectedObject)
  })

  it('works with non-image', () => {
    let filePath = path.join(__dirname, 'example-folder/some-other-file.txt')
    let diograph = Extractor.createDiory(filePath)
    let expectedObject = {
      id: filePath,
      text: 'some-other-file.txt'
    }
    expect(diograph).toEqual(expectedObject)
  })

})




