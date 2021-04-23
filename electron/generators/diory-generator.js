const { v4: uuid } = require('uuid')
const FileType = require('file-type')
const { statSync } = require('fs')
const { basename } = require('path')
const { readFolderMetadata } = require('../readers/folder-reader')
const { readImage } = require('../readers/image-reader')

function generateDiory({ text, date, image, video, latitude, longitude, created, modified, data }) {
  return {
    id: uuid(),
    ...(text && { text }),
    ...(image && { image }),
    ...(video && { video }),
    ...(date && { date }),
    ...(latitude && { latitude }),
    ...(longitude && { longitude }),
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
    return { data: defaultSchema }
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

  // FIXME: Remove video attribute and use contentUrl instead
  if (type === 'video') {
    return {
      video: filePath,
      data: defaultSchema,
    }
  }

  return {
    data: defaultSchema,
  }
}

exports.generateDioryFromFile = async function generateDioryFromFile(filePath) {
  return generateDiory({
    ...(await baseData(filePath)),
    ...(await typeSpecificData(filePath)),
  })
}

function getFirstImage(linkedDiorys) {
  const image = linkedDiorys.map(({ image }) => image).find((image) => image)
  return image && { image }
}

function getAverage(array = []) {
  return array.length
    ? array.reduce((a, b) => parseFloat(a) + parseFloat(b), 0) / array.length
    : undefined
}

function getAverageLocation(linkedDiorys) {
  const locations = linkedDiorys.filter(({ latitude, longitude }) => latitude && longitude)
  const latitudes = locations.map(({ latitude }) => latitude)
  const longitudes = locations.map(({ longitude }) => longitude)
  return (
    locations.length && {
      latitude: getAverage(latitudes),
      longitude: getAverage(longitudes),
    }
  )
}

function getAverageDate(linkedDiorys) {
  const dates = linkedDiorys
    .map(({ date }) => date)
    .filter(Boolean)
    .map(Date.parse)
  return (
    dates.length && {
      date: new Date(getAverage(dates)).toISOString(),
    }
  )
}

/**
 * What is this? What does it do? Not really self-explaining...
 * Does this replace link-generator.js generateLink?
 */
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
