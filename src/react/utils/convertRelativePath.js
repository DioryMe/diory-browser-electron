export const convertRelativePath = (relativePath, connections) => {
  const diographFolderPath = Object.keys(connections).find((path) => connections[path].connected)

  if (RegExp(`^data:`).exec(relativePath)) {
    return relativePath
  }

  if (RegExp(`^diory-demo-content/`).exec(relativePath)) {
    return `http://localhost:3300/${relativePath}`
  }

  if (relativePath && !RegExp(`^(${diographFolderPath}|https?://)`).exec(relativePath)) {
    return `${diographFolderPath}/${relativePath}`
  }

  return relativePath
}
