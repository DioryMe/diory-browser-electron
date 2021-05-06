const fsPromise = require('fs').promises
const backendLogger = require('electron-log')

exports.saveDiographJson = function saveDiographJson(path, diograph, rootId) {
  backendLogger.info('Saving diograph.json to:', path)
  const fileContent = { rootId, diograph }
  return fsPromise.writeFile(`${path}/diograph.json`, JSON.stringify(fileContent, null, 2))
}
