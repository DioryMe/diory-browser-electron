import fileUrl from 'file-url'

export const convertToFileUrl = (relativePath, folderLocation) => {
  // Base64 images
  if (RegExp(`^data:`).exec(relativePath)) {
    return relativePath
  }

  // Test content
  if (RegExp(`^diory-demo-content/`).exec(relativePath)) {
    return `http://localhost:3300/${relativePath}`
  }

  // Images from internet
  if (RegExp('^http(s)?://').exec(relativePath)) {
    return relativePath
  }

  if (!folderLocation) {
    return relativePath
  }

  return relativePath && new URL(relativePath, fileUrl(`${folderLocation}/#`)).href
}
