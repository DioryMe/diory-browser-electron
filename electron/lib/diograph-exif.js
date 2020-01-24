const fs = require('fs')
const ExifReader = require('exifreader')
const _ = require('lodash')

exports.readExifTags = function(path='example.jpg') {
  let data = fs.readFileSync(path)
  let tags = ExifReader.load(data.buffer)
  return tags
}

exports.getImageInfo = function(path='example.jpg') {
  let tags = this.readExifTags(path)
  return {
    dateStart: _.get(tags, ['DateTime', 'value', 0]),
    latitude: _.get(tags, ['GPSLatitude', 'description'], 'n/a'),
    longitude: _.get(tags, ['GPSLongitude', 'description'], 'n/a')
  }
}
