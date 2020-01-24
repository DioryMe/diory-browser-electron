const EXIF = require('./diograph-exif')
const path = require('path')

exports.getDiograph = function(filePath) {
  let basicInfo = {
    name: path.basename(filePath),
    background: filePath
  }
  let extname = path.extname(filePath)
  if (extname == '.jpg') {
    let exifData = EXIF.getImageInfo(filePath)
    Object.assign(basicInfo, exifData)
  }
  return basicInfo
}
