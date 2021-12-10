const path = require('path')

// Straight copy-paste from https://github.com/sindresorhus/file-url/blob/main/index.js
// - couldn't use it directly because it uses "import path from 'path'" syntax internally
function toFileUrl(filePath, options = {}) {
  if (typeof filePath !== 'string') {
    throw new TypeError(`Expected a string, got ${typeof filePath}`)
  }

  const { resolve = true } = options

  let pathName = filePath
  if (resolve) {
    pathName = path.resolve(filePath)
  }

  pathName = pathName.replace(/\\/g, '/')

  // Windows drive letter must be prefixed with a slash.
  if (pathName[0] !== '/') {
    pathName = `/${pathName}`
  }

  // Escape required characters for path components.
  // See: https://tools.ietf.org/html/rfc3986#section-3.3
  return encodeURI(`file://${pathName}`).replace(/[?#]/g, encodeURIComponent)
}

exports.makeRelative = function makeRelative(url, baseUrl) {
  const baseFileUrl = toFileUrl(baseUrl, { resolve: false })
  const fileUrl = toFileUrl(url, { resolve: false })

  if (fileUrl.startsWith(baseFileUrl)) {
    return fileUrl.replace(`${baseFileUrl}/`, '')
  }

  return url
}

exports.convertDiographUrlsRelative = function convertDiographUrlsRelative({ diograph, baseUrl }) {
  Object.keys(diograph).forEach((dioryId) => {
    const diory = diograph[dioryId]
    if (diory.image) {
      diory.image = exports.makeRelative(diory.image, baseUrl)
    }
    if (diory.data && diory.data[0].contentUrl) {
      diory.data[0].contentUrl = exports.makeRelative(diory.data[0].contentUrl, baseUrl)
    }
  })
  return diograph
}
