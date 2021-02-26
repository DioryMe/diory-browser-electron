const { statSync } = require('fs')
const { extname, parse } = require('path')

// File types without browser support are pending for "Reveal in Finder" feature
const fileTypes = {
  image: ['.jpg', '.jpeg', '.png', '.gif', '.tiff', '.bmp'], // '.eps'
  video: ['.mpg', '.mpeg', '.mov', '.mp4', '.m4v'], // '.avi', '.flv', '.mkv'
  audio: ['.mp3', '.opus', '.m4a', '.wav'], // '.it', '.s3m', '.mid'
  text: ['.log', '.txt', '.md', '.html', '.pdf'], // '.rtf', '.rtfd'
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
