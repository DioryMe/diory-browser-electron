import { resolveFileType, readFile } from '../readers/file-reader'
import { readFolder } from '../readers/folder-reader'
import { readImage } from '../readers/image-reader'

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

export function generateFileDiory(filePath) {
  const type = resolveFileType(filePath)
  const fileData = readFileData(type, filePath) || {}
  return generateDiory(fileData)
}

export function generateFolderDiory(folderPath) {
  const folder = readFolder(folderPath) || {}
  return generateDiory(folder)
}
