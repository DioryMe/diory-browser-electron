const { v4: uuid } = require('uuid')
const { resolveFileType, readFile } = require('../readers/file-reader')
const { readFolder } = require('../readers/folder-reader')
const { readImage } = require('../readers/image-reader')

function readFileData(type, filePath) {
  const fileData = readFile(filePath)
  switch (type) {
    case 'image':
      return {
        created: fileData.created,
        modified: fileData.modified,
        ...readImage(filePath),
      }
    default:
      return fileData
  }
}

function generateDiory({ text, date, image, latitude, longitude, created, modified }) {
  return {
    id: uuid(),
    ...(text && { text }),
    ...(image && { image }),
    ...(date && { date }),
    ...(latitude && { latitude }),
    ...(longitude && { longitude }),
    ...(created && { created }),
    ...(modified && { modified }),
  }
}

exports.generateFileDiory = function generateFileDiory(filePath) {
  const type = resolveFileType(filePath)
  const fileData = readFileData(type, filePath) || {}
  return generateDiory(fileData)
}

function getFirstImage(linkedDiorys) {
  return linkedDiorys.map(({ image }) => image).find((image) => image)
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
  return {
    ...(latitudes && { latitude: getAverage(latitudes) }),
    ...(longitudes && { longitude: getAverage(longitudes) }),
  }
}

exports.generateFolderDiory = function generateFolderDiory(folderPath, linkedDiorys = []) {
  const folder = readFolder(folderPath) || {}
  const image = getFirstImage(linkedDiorys)
  const location = getAverageLocation(linkedDiorys)
  return generateDiory({ image, ...location, ...folder })
}
