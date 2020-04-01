const { readFileSync } = require('fs')
const { load } = require('exifreader')

function readExifTags(imagePath = '') {
  const file = readFileSync(imagePath)
  return load(file.buffer)
}

function getDateTime(dateTime) {
  if (!dateTime) {
    return
  }
  const [year, month, date, hour, min, sec] = dateTime.value[0].split(/\D/)
  return [year, month, date].join('-') + 'T' + [hour, min, sec].join(':') + '.000Z'
}

function getDate({ DateTime, DateTimeOriginal }) {
  const date = getDateTime(DateTime) || getDateTime(DateTimeOriginal)
  return date && { date }
}

function getIsoDate(isoDate) {
  return isoDate && isoDate.value.slice(0, 23) + 'Z'
}

function getCreated({ DateCreated, CreateDate }) {
  const created = getIsoDate(DateCreated) || getIsoDate(CreateDate)
  return created && { created }
}

function getLatitude({ GPSLatitude = {} }) {
  const latitude = GPSLatitude.description
  return latitude && { latitude }
}

function getLongitude({ GPSLongitude = {} }) {
  const longitude = GPSLongitude.description
  return longitude && { longitude }
}

exports.readImage = function readImage(imagePath) {
  if (!imagePath) {
    return
  }
  try {
    const tags = readExifTags(imagePath)
    return {
      image: imagePath,
      ...getDate(tags),
      ...getLatitude(tags),
      ...getLongitude(tags),
      ...getCreated(tags),
    }
  } catch (error) {
    console.info(`Error reading image ${imagePath}: ${error}`)
  }
}
