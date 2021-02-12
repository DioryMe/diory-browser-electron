const { generateDiograph } = require('../generators/diograph-generator')
const { saveDiographJson } = require('../lib/save-diograph-json')
const { readDiographJson } = require('../lib/read-diograph-json')
const { isEmpty } = require('../lib/utils')

/**
 * Event handler for GENERATE_DIOGRAPH channel
 * @function
 * @param event {Object} - Event from frontend via ipcMain
 * @param params {Object} - Path as string
 * @return {Promise} Resolves with object with id, diograph and path keys (diograph as Object)
 *
 * @example Response object:
 * {
 *   rootId: 'diory2',
 *   path: '/Users/...',
 *   diograph: {
 *     diory1: { id: 'diory1', image: '...', links: [...] },
 *     diory2: { id: 'diory2', image: '...', links: [...] }
 *   }
 * }
 *
 */
exports.generateDiographEventHandler = async (event, path) => {
  const existingDiograph = readDiographJson(path)
  if (existingDiograph.diograph) {
    const folderStructureDiograph = await generateDiograph(path)
    const newDiories = compareDiographs(existingDiograph, folderStructureDiograph)
    if (!isEmpty(newDiories)) {
      const mergedDiograph = addDioriesToDiograph(newDiories, existingDiograph)
      return mergedDiograph
    }
    return { ...existingDiograph, path }
  }
  const { rootId, diograph } = await generateDiograph(path)
  await saveDiographJson(path, diograph, rootId)
  return { rootId, diograph, path }
}

function compareDiographs(existingDiograph, folderStructureDiograph) {
  return []
}

function addDioriesToDiograph(diories, diograph) {
  return diories
}
