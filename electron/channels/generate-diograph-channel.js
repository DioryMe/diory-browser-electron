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
 *   id: 'diory2',
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
    const diographJSON = readDiographJSON(path)
    if (diographJSON) {
      resolve({
        id: 'id',
        diograph: diographJSON,
        path,
      })
    }
    generateDiograph(path).then(({ id, diograph }) => {
      saveDiographJSON(path, diograph)
        .then(() => {
          resolve({ id, diograph, path })
        })
        .catch((err) => {
          reject(err)
        })
    })
  })
