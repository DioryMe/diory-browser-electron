const { resolve } = require('path')

const ignoredFiles = ['diograph.json', '.DS_Store', 'Icon']

exports.isValid = function isValid(dirent) {
  return !ignoredFiles.includes(dirent.name)
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
