const fs = require('fs')
const backendLogger = require('electron-log')

/**
 * readDiographJson
 * @function
 * @param path {string} - Path of the diograph folder
 * @return {Object} - Object with diograph as key and
 * parsed diograph.json content (or undefined if no diograph.json found)
 * as value
 *
 * @example Response object:
 * {
 *   rootId: 'diory1',
 *   diograph: {
 *      diory1: { id: 'diory1', image: '...', links: [...] },
 *      diory2: { id: 'diory2', image: '...', links: [...] }
 *   }
 * }
 *
 */
exports.readDiographJson = function (path) {
  const folderPath = path
  const diographJsonPath = `${path}/diograph.json`

  if (!fs.existsSync(folderPath)) {
    const errorMessage = `readDiographJson: Provided diograph folder path doesn't exist (${folderPath}). Did you use FileDialog to select it?`
    throw new Error(errorMessage)
  }

  if (fs.existsSync(diographJsonPath)) {
    backendLogger.info('readDiographJson: reading diograph.json in', path)
    const raw = fs.readFileSync(diographJsonPath)
    const { rootId, diograph } = JSON.parse(raw)
    return { rootId, diograph }
  }

  backendLogger.info('readDiographJson: diograph.json not found in', path)
  return {
    rootId: undefined,
    diograph: undefined,
  }
}
