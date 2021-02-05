const fs = require('fs')
const fsPromise = require('fs').promises
const backendLogger = require('electron-log')

/**
 * readDiographJSON
 * @function
 * @param path {string} - Path of the diograph folder
 * @return {Object} - Object with diograph as key and
 * parsed diograph.json content (or undefined if no diograph.json found)
 * as value
 *
 * @example Response object:
 * {
 *   diograph: {
 *      diory1: { id: 'diory1', image: '...', links: [...] },
 *      diory2: { id: 'diory2', image: '...', links: [...] }
 *   }
 * }
 *
 */
exports.readDiographJSON = (path) => {
  const folderPath = path
  const diographJSONPath = `${path}/diograph.json`

  if (!fs.existsSync(folderPath)) {
    const errorMessage = `readDiographJSON: Provided diograph folder path doesn't exist (${folderPath}). Did you use FileDialog to select it?`
    throw new Error(errorMessage)
  }

  if (fs.existsSync(diographJSONPath)) {
    backendLogger.info('readDiographJSON: reading diograph.json in', path)
    const raw = fs.readFileSync(diographJSONPath)
    const { rootId, diograph } = JSON.parse(raw)
    return { rootId, diograph }
  }

  backendLogger.info('readDiographJSON: diograph.json not found in', path)
  return {
    rootId: undefined,
    diograph: undefined,
  }
}

/*
 * saveDiographJSON
 * @function
 * @param path {string} - Path of the diograph folder
 * @param diograph {object} - Diograph object to be saved to diograph.json
 * @return {Promise} - Resolves with no arguments upon success
 *
 */
exports.saveDiographJSON = (path, diograph, rootId) => {
  backendLogger.info('Saving diograph.json to:', path)
  const fileContent = {
    rootId,
    diograph: JSON.stringify(diograph, null, 2),
  }
  return fsPromise.writeFile(`${path}/diograph.json`, fileContent)
}
