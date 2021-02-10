const { v4: uuid } = require('uuid')
const { resolveFileType, readFile } = require('../readers/file-reader')
const { readFolderMetadata } = require('../readers/folder-reader')
const { readImage } = require('../readers/image-reader')
const { readVideo } = require('../readers/video-reader')

function readFileData(type, filePath) {
  const fileData = readFile(filePath)
  switch (type) {
    case 'image':
      return {
        created: fileData.created,
        modified: fileData.modified,
        ...readImage(filePath),
      }
    case 'video':
      return {
        created: fileData.created,
        modified: fileData.modified,
        ...readVideo(filePath),
      }
    default:
      return fileData || {}
  }
}

function generateDiory({ text, date, image, video, latitude, longitude, created, modified }) {
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
  }
}

exports.generateDioryFromFile = function generateDioryFromFile(filePath) {
  const type = resolveFileType(filePath)
  const fileData = readFileData(type, filePath) || {}
  return generateDiory(fileData)
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

function generateLinks(dioryLinks) {
  return Object.entries(dioryLinks)
    .reduce((obj, [linkKey, { id }]) => ({
      ...obj,
      [linkKey]: { id },
    }), {})
}

exports.generateDioryFromFolder = function generateDioryFromFolder(folderPath, dioryLinks = {}) {
  const linkedDiorys = Object.values(dioryLinks)
  return generateDiory({
    ...getFirstImage(linkedDiorys),
    ...getAverageLocation(linkedDiorys),
    ...getAverageDate(linkedDiorys),
    ...readFolderMetadata(folderPath),
    ...generateLinks(dioryLinks)
  })
}
