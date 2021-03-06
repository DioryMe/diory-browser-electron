const { readDiographJson } = require('../lib/read-diograph-json')

/**
 * Event handler for GET_ROOM channel
 * @function
 * @param event {Object} - Event from frontend via ipcMain
 * @param params {Object} - Address (=path) of the room (inside of an object `{ address: '/Users...' }`)
 * @return {Promise} Resolves with rootId and diograph keys
 *
 * @example Response object:
 * {
 *   rootId: 'development-room-content',
 *   diograph: {
 *     development-room-content: { id: 'development-room-content', image: '...', links: [...] },
 *     diory2: { id: 'diory2', image: '...', links: [...] }
 *   }
 * }
 *
 */
exports.getRoomEventHandler = async function getRoomEventHandler(event, { address }) {
  return readDiographJson(address)
}
