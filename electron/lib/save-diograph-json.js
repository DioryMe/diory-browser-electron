const fsPromise = require('fs').promises

exports.saveDiographJson = function saveDiographJson({ diographJsonPath, diograph, rootId }) {
  const fileContent = { rootId, diograph }
  return fsPromise.writeFile(diographJsonPath, JSON.stringify(fileContent, null, 2))
}
