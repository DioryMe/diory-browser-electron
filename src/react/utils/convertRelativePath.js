export const convertRelativePath = (relativePath, connections) => {
  const diographFolderPath = Object.keys(connections).find((path) => connections[path].connected)
  if (relativePath && !RegExp(`^${diographFolderPath}`).exec(relativePath)) {
    return `${diographFolderPath}/${relativePath}`
  }

  return relativePath
}
