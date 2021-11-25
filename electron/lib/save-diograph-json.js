const fsPromise = require('fs').promises
const path = require('path').posix

exports.saveDiographJson = function saveDiographJson({ dioryFolderLocation, diograph, rootId }) {
  const diographJsonPath = path.join(dioryFolderLocation, 'diograph.json')
  const fileContent = { rootId, diograph }
  return fsPromise.writeFile(diographJsonPath, JSON.stringify(fileContent, null, 2))
}
