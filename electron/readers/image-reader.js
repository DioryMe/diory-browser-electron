const { readFileSync } = require('fs')
const { load } = require('exifreader')
const FileType = require('file-type')

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

async function generateSchema(tags, imagePath) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ImageObject',
    contentUrl: imagePath,
    height: tags && tags['Image Height'] && tags['Image Height'].value,
    width: tags && tags['Image Width'] && tags['Image Width'].value,
    encodingFormat: (await FileType.fromFile(imagePath)).mime,
  }
}

exports.readImage = async function readImage(imagePath) {
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
      data: {
        ...(await generateSchema(tags, imagePath)),
      },
    }
  } catch (error) {
    console.info(`Error reading image ${imagePath}: ${error}`)
  }
}
