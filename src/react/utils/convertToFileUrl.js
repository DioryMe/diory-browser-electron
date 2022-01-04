// Imported from https://github.com/sindresorhus/file-url/blob/main/index.js
// - remove unnecessary use of 'path' (node core module)
function fileUrl(filePath) {
  if (typeof filePath !== 'string') {
    throw new TypeError(`Expected a string, got ${typeof filePath}`)
  }

  let pathName = filePath

  pathName = pathName.replace(/\\/g, '/')

  // Windows drive letter must be prefixed with a slash.
  if (pathName[0] !== '/') {
    pathName = `/${pathName}`
  }

  // Escape required characters for path components.
  // See: https://tools.ietf.org/html/rfc3986#section-3.3
  return encodeURI(`file://${pathName}`).replace(/[?#]/g, encodeURIComponent)
}

export const convertToFileUrl = (relativePath, folderLocation) => {
  // Base64 images
  if (/^data:/.exec(relativePath)) {
    return relativePath
  }

  // Test content
  if (/^diory-demo-content/.exec(relativePath)) {
    return `http://localhost:3300/${relativePath}`
  }

  // Images from internet
  if (/^http(s)?:\/\//.exec(relativePath)) {
    return relativePath
  }

  if (!folderLocation) {
    return relativePath
  }

  return relativePath && new URL(relativePath, fileUrl(`${folderLocation}/#`)).href
}
