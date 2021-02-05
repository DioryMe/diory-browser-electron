const { generateDiograph } = require('../generators/diograph-generator')
const { saveDiographJSON, readDiographJSON } = require('../lib/room-util')

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
exports.generateDiographEventHandler = (event, path) =>
  new Promise((resolve, reject) => {
    const { rootId, diograph } = readDiographJSON(path)
    if (diograph) {
      resolve({ rootId, diograph, path })
    } else {
      generateDiograph(path).then(({ rootId, diograph }) => {
        saveDiographJSON(path, diograph, rootId)
          .then(() => {
            resolve({ rootId, diograph, path })
          })
          .catch((err) => {
            reject(err)
          })
      })
    }
  })
