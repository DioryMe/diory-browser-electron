const Extractor = require('../lib/diograph-extractor')
const path = require('path')

describe('getDiograph', () => {

  it('works with image', () => {
    let imagePath = path.join(__dirname, 'example-folder/example.jpg')
    let diograph = Extractor.getDiograph(imagePath)
    let expectedObject = {
      name: 'example.jpg',
      dateStart: '2008:11:01 21:15:11',
      latitude: 43.464455,
      longitude: 11.881478333333334
    }
    expect(diograph).toEqual(expectedObject)
  })

  it('works with non-image', () => {
    let filePath = path.join(__dirname, 'example-folder/some-other-file.txt')
    let diograph = Extractor.getDiograph(filePath)
    let expectedObject = {
      name: 'some-other-file.txt'
    }
    expect(diograph).toEqual(expectedObject)
  })

})




