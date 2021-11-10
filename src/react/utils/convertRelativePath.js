export const convertRelativePath = (relativePath, folderLocation) => {
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

  // Already absolute path
  if (RegExp(`^${folderLocation}`).exec(relativePath)) {
    return relativePath
  }

  return relativePath && `${folderLocation}/${relativePath}`
}
