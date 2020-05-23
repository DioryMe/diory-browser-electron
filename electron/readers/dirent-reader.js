const { resolve } = require('path')

exports.isValid = function isValid(dirent) {
  return dirent.name != 'diograph.json' && dirent.name != '.DS_Store'
}
exports.isFile = function isFile(dirent) {
  return dirent.isFile()
}

exports.isFolder = function isFolder(dirent) {
  return dirent.isDirectory()
}

exports.getPath = function getPath(folderPath) {
  return (dirent) => resolve(folderPath, dirent.name)
}
