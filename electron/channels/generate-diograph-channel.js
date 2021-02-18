const { generateDiograph } = require('../generators/diograph-generator')
const { saveDiographJson } = require('../lib/save-diograph-json')
const { readDiographJson } = require('../lib/read-diograph-json')

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
exports.generateDiographEventHandler = async function generateDiographEventHandler(event, path) {
  if (readDiographJson(path).diograph) {
    const { rootId, diograph } = readDiographJson(path)
    return { rootId, diograph, path }
  }
  const { rootId, diograph } = await generateDiograph(path)
  await saveDiographJson(path, diograph, rootId)
  return { rootId, diograph, path }
}
