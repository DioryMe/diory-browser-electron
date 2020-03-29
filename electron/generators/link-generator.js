const { basename } = require('path')

exports.generateFileLink = function generateFileLink(filePath = '', { id }) {
  const path = basename(filePath)
  return {
    [path]: { id }
  }
}

exports.generateFolderLink = function generateFolderLink(filePath = '', { id }) {
  const path = basename(filePath)
  return {
    [path]: { id }
  }
}
