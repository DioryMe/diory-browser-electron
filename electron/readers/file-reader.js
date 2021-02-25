const { statSync } = require('fs')
const { extname, parse } = require('path')

const fileTypes = {
  image: ['.jpg', '.jpeg', '.png', '.gif', '.tiff', '.bmp', '.eps'],
  video: ['.mpg', '.mpeg', '.mov', '.mp4', '.avi', '.m4v', '.flv', '.mkv'],
  audio: ['.mp3, .opus', '.m4a', '.wav', '.it', '.s3m', '.mid'],
  text: ['.txt', '.md', '.rtf'],
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
