const EXIF = require('../lib/diograph-exif')
const path = require('path')

let imagePath = path.join(__dirname, 'example-folder/example.jpg')

describe('readExifTags', () => {
  it('returns tags', () => {
    let exifData = EXIF.readExifTags(imagePath)
    let expectedDate = '2008:11:01 21:15:11'
    expect(exifData['DateTime']['value'][0]).toEqual(expectedDate)
  })
})

describe('getImageInfo', () => {
  it('returns image info object', () => {
    let imageInfo = EXIF.getImageInfo(imagePath)
    let expectedObject = {
      id: '2008-11-01T21:15:11.000Z',
      date: '2008-11-01T21:15:11.000Z',
      image: imagePath,
      latitude: 43.464455,
      longitude: 11.881478333333334,
    }
    expect(imageInfo).toEqual(expectedObject)
  })
})
