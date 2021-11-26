const fs = require('fs')
const path = require('path').posix
const { readDiographJson } = require('./read-diograph-json')

exports.getDiograph = function getDiograph(dioryFolderLocation) {
  if (!fs.existsSync(dioryFolderLocation)) {
    const errorMessage = `GET_DIOGRAPH: Provided dioryFolderLocation didn't exist anymore: ${dioryFolderLocation}`
    throw new Error(errorMessage)
  }

  const diographJsonPath = path.join(dioryFolderLocation, 'diograph.json')

  if (!fs.existsSync(diographJsonPath)) {
    const errorMessage = `GET_DIOGRAPH: Provided dioryFolderLocation didn't contain diograph.json: ${dioryFolderLocation}`
    throw new Error(errorMessage)
  }

  return readDiographJson({ diographJsonPath })
}
