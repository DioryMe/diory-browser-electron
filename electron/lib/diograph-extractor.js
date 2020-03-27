const EXIF = require('./diograph-exif')
const path = require('path')

function isImage(filePath) {
  return ['.jpg', '.jpeg'].includes(path.extname(filePath).toLowerCase())
}

function extractImageFile(filePath) {
  return EXIF.getImageInfo(filePath)
}

function getLinks(links) {
  return (
    links && {
      links: links.reduce(
        (obj, { filePath }) => ({
          ...obj,
          [path.basename(filePath)]: {
            id: isImage(filePath) ? extractImageFile(filePath).id : filePath,
          },
        }),
        {}
      ),
    }
  )
}

exports.createDiory = function({ filePath, links }) {
  if (isImage(filePath)) {
    return extractImageFile(filePath)
  }

  return {
    id: filePath,
    text: path.basename(filePath),
    ...getLinks(links),
  }
}
