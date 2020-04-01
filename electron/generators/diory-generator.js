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
    id: created,
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

exports.generateFolderDiory = function generateFolderDiory(folderPath) {
  const folder = readFolder(folderPath) || {}
  return generateDiory(folder)
}
