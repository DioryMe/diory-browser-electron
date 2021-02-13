const fsPromise = require('fs').promises
const backendLogger = require('electron-log')

/*
 * saveDiographJson
 * @function
 * @param path {string} - Path of the diograph folder
 * @param diograph {object} - Diograph object to be saved to diograph.json
 * @param rootId {object} - RootId to be saved to diograph.json
 * @return {Promise} - Resolves with no arguments upon success
 *
 */
exports.saveDiographJson = function (path, diograph, rootId) {
  backendLogger.info('Saving diograph.json to:', path)
  const fileContent = { rootId, diograph }
  return fsPromise.writeFile(`${path}/diograph.json`, JSON.stringify(fileContent, null, 2))
}
