const { statSync } = require('fs')
const { extname, parse } = require('path')

const fileTypes = {
  image: ['.jpg', '.jpeg', '.png'],
  video: ['.mpg', '.mov'],
  text: ['.txt', '.md'],
}

exports.resolveFileType = function resolveFileType(filePath = '') {
  const fileType = Object.entries(fileTypes)
    .find(([, extnames]) => extnames.includes(extname(filePath)))
  if (fileType) {
    return fileType[0]
  }
}

exports.readFile = function readFile(filePath = '') {
  const fileStats = statSync(filePath) || {}
  return {
    name: parse(filePath).name,
    created: fileStats.ctime,
    modified: fileStats.mtime,
  }
}
