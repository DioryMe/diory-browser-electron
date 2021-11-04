export const convertRelativePath = (relativePath, folderLocation) => {
  if (RegExp(`^data:`).exec(relativePath)) {
    return relativePath
  }

  if (RegExp(`^diory-demo-content/`).exec(relativePath)) {
    return `http://localhost:3300/${relativePath}`
  }

  if (relativePath && !RegExp(`^(${folderLocation}|https?://)`).exec(relativePath)) {
    return `${folderLocation}/${relativePath}`
  }

  return relativePath
}
