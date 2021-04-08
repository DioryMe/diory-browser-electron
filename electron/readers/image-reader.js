const { readFileSync } = require('fs')
const { pathToFileURL } = require('url')
const { load } = require('exifreader')

function readExifTags(imagePath = '') {
  const file = readFileSync(imagePath)
  return load(file.buffer)
}

function formatHour(hour) {
  return `0${hour % 24}`.slice(-2)
}

function getDateTime(dateTime) {
  if (!dateTime) {
    return
  }
  const [year, month, date, hour, min, sec] = dateTime.value[0].split(/\D/)
  return `${[year, month, date].join('-')}T${[formatHour(hour), min, sec].join(':')}.000Z`
}

function getDate({ DateTime, DateTimeOriginal }) {
  const date = getDateTime(DateTime) || getDateTime(DateTimeOriginal)
  return date && { date }
}

function getIsoDate(isoDate) {
  return isoDate && isoDate.value.slice(0, 23) + 'Z' // eslint-disable-line prefer-template
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

function generateSchema(tags, imageContentUrl) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ImageObject',
    contentUrl: imageContentUrl,
    height: tags && tags['Image Height'] && tags['Image Height'].value,
    width: tags && tags['Image Width'] && tags['Image Width'].value,
  }
}

exports.readImage = function readImage(imagePath) {
  if (!imagePath) {
    return
  }
  try {
    const tags = readExifTags(imagePath)
    const imageContentUrl = pathToFileURL(imagePath).toString()
    return {
      image: imageContentUrl,
      ...getDate(tags),
      ...getLatitude(tags),
      ...getLongitude(tags),
      ...getCreated(tags),
      data: {
        ...generateSchema(tags, imageContentUrl),
      },
    }
  } catch (error) {
    console.info(`Error reading image ${imagePath}: ${error}`)
  }
}
