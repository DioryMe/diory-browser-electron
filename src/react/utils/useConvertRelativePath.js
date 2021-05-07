export const useConvertRelativePath = (path, connections) => {
  Object.keys(connections).forEach((path) => {
    if (connections[path].connected) {
      return path
    }
  })
  throw new Error('None of the connections were connected!')
}
