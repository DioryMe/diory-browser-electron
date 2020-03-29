const { resolve } = require('path')

exports.isFile = function isFile(dirent) {
  return dirent.isFile()
}

exports.isFolder = function isFolder(dirent) {
  return dirent.isDirectory()
}

exports.getPath = function getPath(folderPath) {
  return (dirent) => resolve(folderPath, dirent.name)
}
