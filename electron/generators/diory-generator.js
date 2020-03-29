const { resolveFileType, readFile } = require('../readers/file-reader')
const { readFolder } = require('../readers/folder-reader')
const { readImage } = require('../readers/image-reader')

function readFileData(type, filePath) {
  switch (type) {
    case 'image': return readImage(filePath)
    default: return readFile(filePath)
  }
}

function generateDiory({ name, created, modified }) {
  return {
    id: created,
    ...(name && { text: name }),
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
