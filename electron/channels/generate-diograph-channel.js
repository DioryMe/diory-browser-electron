const { generateDiograph } = require('../generators/diograph-generator')
const { saveDiographJson } = require('../lib/save-diograph-json')
const { readDiographJson } = require('../lib/read-diograph-json')
const { compareAndMergeDiographs } = require('./compare-and-merge-diographs')

/**
 * Event handler for GENERATE_DIOGRAPH channel
 * @function
 * @param event {Object} - Event from frontend via ipcMain (not used)
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
exports.generateDiographEventHandler = async function generateDiographEventHandler(event, path) {
  const existingDiograph = readDiographJson(path)
  const folderStructureDiograph = await generateDiograph(path)
  const diograph = existingDiograph
    ? compareAndMergeDiographs(existingDiograph, folderStructureDiograph)
    : folderStructureDiograph
  await saveDiographJson(path, diograph.diograph, diograph.rootId)
  return { ...diograph, path }
}
