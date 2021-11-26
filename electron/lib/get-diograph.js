const fs = require('fs')
const path = require('path').posix
const { readDiographJson } = require('./read-diograph-json')

exports.getDiograph = async function getDiograph(dioryFolderLocation) {
  const diographJsonPath = path.join(dioryFolderLocation, 'diograph.json')

  if (!fs.existsSync(dioryFolderLocation)) {
    const errorMessage = `GET_DIOGRAPH: Diory folder location didn't exist anymore: ${dioryFolderLocation}`
    throw new Error(errorMessage)
  }

  return readDiographJson(diographJsonPath)
}
