export const useConvertRelativePath = (relativePath, connections) => {
  const diographFolderPath = Object.keys(connections).find((path) => connections[path].connected)
  return `${diographFolderPath}/${relativePath}`
}
