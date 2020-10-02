const { statSync } = require('fs')
const { extname, parse } = require('path')

const fileTypes = {
  image: ['.jpg', '.jpeg', '.png'],
  video: ['.mpg', '.mov', '.mp4', '.avi'],
  text: ['.txt', '.md'],
}

exports.resolveFileType = function resolveFileType(filePath = '') {
  const fileType = Object.entries(fileTypes).find(([, extnames]) =>
    extnames.includes(extname(filePath.toLowerCase()))
  )
  if (fileType) {
    return fileType[0]
  }
}

exports.readFile = function readFile(filePath = '') {
  const { birthtime, mtime } = statSync(filePath) || {}
  return {
    text: parse(filePath).name,
    created: birthtime && birthtime.toISOString(),
    modified: mtime && mtime.toISOString(),
  }
}
