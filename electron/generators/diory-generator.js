const { v4: uuid } = require('uuid')
const FileType = require('file-type')
const { statSync } = require('fs')
const { basename } = require('path')
const { readFolderMetadata } = require('../readers/folder-reader')
const { readImage } = require('../readers/image-reader')
const { getDefaultImage } = require('../../src/shared/getDefaultImage')

function generateDiory({ text, date, image, latlng, created, modified, data }) {
  return {
    id: uuid(),
    ...(text && { text }),
    ...(image ? { image } : { image: getDefaultImage() }),
    ...(date && { date }),
    ...(latlng && { latlng }),
    ...(created && { created }),
    ...(modified && { modified }),
    ...(data && { data }),
  }
}

async function baseData(filePath) {
  const { birthtime, mtime } = statSync(filePath) || {}
  return {
    text: basename(filePath),
    created: birthtime && birthtime.toISOString(),
    modified: mtime && mtime.toISOString(),
  }
}

async function typeSpecificData(filePath) {
  const defaultSchema = {
    '@context': 'https://schema.org',
    '@type': 'DigitalDocument',
    contentUrl: filePath,
  }

  const fileType = await FileType.fromFile(filePath)
  if (!fileType || !fileType.mime) {
    return { data: [defaultSchema] }
  }
  defaultSchema.encodingFormat = fileType.mime

  const type = fileType.mime.split('/')[0]
  switch (type) {
    case 'image':
      return readImage(filePath)
    case 'video':
      defaultSchema['@type'] = 'VideoObject'
      break
    case 'audio':
      defaultSchema['@type'] = 'AudioObject'
      break
    // case 'application':
    // case 'text':
    default:
  }

  return { data: [defaultSchema] }
}

exports.generateDioryFromFile = async function generateDioryFromFile(filePath) {
  return generateDiory({
    ...(await baseData(filePath)),
    ...(await typeSpecificData(filePath)),
  })
}

function getFirstImage(linkedDiorys) {
  const image = linkedDiorys
    .map(({ image }) => image)
    .find((image) => image && !/^data:/.exec(image))
  return image && { image }
}

function getAverage(array = []) {
  return array.length
    ? array.reduce((a, b) => parseFloat(a) + parseFloat(b), 0) / array.length
    : undefined
}

function getAverageLocation(linkedDiorys) {
  const locations = linkedDiorys.filter(({ latlng }) => latlng)
  const latitudes = locations.map(({ latlng }) => latlng.split(', ')[0])
  const longitudes = locations.map(({ latlng }) => latlng.split(', ')[1])
  return (
    locations.length && {
      latlng: `${getAverage(latitudes)}, ${getAverage(longitudes)}`,
    }
  )
}

function getAverageDate(linkedDiorys) {
  const dates = linkedDiorys
    .map(({ date }) => date)
    .filter(Boolean)
    .map(Date.parse)
    // eslint-disable-next-line no-restricted-globals
    .filter((date) => !isNaN(date))
  return (
    dates.length && {
      date: new Date(getAverage(dates)).toISOString(),
    }
  )
}

function generateLinks(dioryLinks) {
  return (
    !!dioryLinks && {
      links: Object.entries(dioryLinks).reduce(
        (obj, [linkKey, { id }]) => ({
          ...obj,
          [linkKey]: { id },
        }),
        {}
      ),
    }
  )
}

exports.generateDioryFromFolder = function generateDioryFromFolder(folderPath, dioryLinks = {}) {
  const linkedDiorys = Object.values(dioryLinks)
  return {
    ...generateDiory({
      ...getFirstImage(linkedDiorys),
      ...getAverageLocation(linkedDiorys),
      ...getAverageDate(linkedDiorys),
      ...readFolderMetadata(folderPath),
    }),
    ...generateLinks(dioryLinks),
  }
}
