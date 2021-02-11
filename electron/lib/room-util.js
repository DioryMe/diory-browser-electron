const fs = require('fs')
const fsPromise = require('fs').promises
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
exports.readDiographJson = (path) => {
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

/*
 * saveDiographJson
 * @function
 * @param path {string} - Path of the diograph folder
 * @param diograph {object} - Diograph object to be saved to diograph.json
 * @param rootId {object} - RootId to be saved to diograph.json
 * @return {Promise} - Resolves with no arguments upon success
 *
 */
exports.saveDiographJson = (path, diograph, rootId) => {
  backendLogger.info('Saving diograph.json to:', path)
  const fileContent = { rootId, diograph }
  return fsPromise.writeFile(`${path}/diograph.json`, JSON.stringify(fileContent, null, 2))
}
