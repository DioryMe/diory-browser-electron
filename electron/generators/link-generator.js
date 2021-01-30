const { basename } = require('path')

// Luo folderin rootDiorylle linkin sen sisältämistä tiedostoista tehtyihin dioreihin
exports.generateLinkToFileDiory = function generateLinkToFileDiory(filePath = '', { fileDioryId } = {}) {
  const path = basename(filePath) // file name
  return (
    path &&
    id && {
      [path]: { id },
    }
  )
}

// MOVED FROM diograph-generator (because almost the sam as these)
function addToDiograph(rootDiory) {
  return (
    rootDiory.id && {
      [rootDiory.id]: rootDiory,
    }
  )
}

exports.generateLinkToFolderDiory = function generateLinkToFolderDiory(filePath = '', { folderDioryId } = {}) {
  const path = basename(filePath) // folder name
  return (
    path &&
    id && {
      [path]: { id },
    }
  )
}
