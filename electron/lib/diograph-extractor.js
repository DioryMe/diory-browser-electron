const EXIF = require('./diograph-exif')
const path = require('path')

function isImage(filePath) {
  return path.extname(filePath) === '.jpg'
}

function extractImageFile(filePath) {
  return EXIF.getImageInfo(filePath)
}

exports.createDiory = function(filePath) {
  if (isImage(filePath)) {
    return extractImageFile(filePath)
  }

  return {
    id: filePath,
    text: path.basename(filePath),
  }
}
