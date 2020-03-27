const fs = require('fs')
const ExifReader = require('exifreader')
const _ = require('lodash')

exports.readExifTags = function(path = 'example.jpg') {
  const data = fs.readFileSync(path)
  const tags = ExifReader.load(data.buffer)
  return tags
}

function extractDateTime(dateTime) {
  if (!dateTime) {
    return
  }
  const [year, month, date, hour, min, sec] = dateTime.value[0].split(/\D/)
  return [year, month, date].join('-') + 'T' + [hour, min, sec].join(':') + '.000Z'
}

function extractDateCreated(isoDate) {
  return isoDate && isoDate.value.slice(0, 23) + 'Z'
}

function getId({ DateTime, DateTimeOriginal, DateCreated, CreateDate }) {
  return (
    extractDateCreated(DateCreated) ||
    extractDateCreated(CreateDate) ||
    extractDateTime(DateTime) ||
    extractDateTime(DateTimeOriginal)
  )
}

function getDate({ DateTime, DateTimeOriginal, DateCreated, CreateDate }) {
  const date =
    extractDateTime(DateTime) ||
    extractDateTime(DateTimeOriginal) ||
    extractDateCreated(DateCreated) ||
    extractDateCreated(CreateDate)
  return date && { date }
}

function getLatitude(tags) {
  const latitude = _.get(tags, ['GPSLatitude', 'description'])
  return latitude && { latitude }
}

function getLongitude(tags) {
  const longitude = _.get(tags, ['GPSLongitude', 'description'])
  return longitude && { longitude }
}

exports.getImageInfo = function(path = 'example.jpg') {
  try {
    const tags = this.readExifTags(path)
    return {
      id: getId(tags),
      image: path,
      ...getDate(tags),
      ...getLatitude(tags),
      ...getLongitude(tags),
    }
  } catch (error) {
    console.log(`Error getImageInfo ${path}: ${error}`)
    return {
      id: path,
      image: path,
    }
  }
}
