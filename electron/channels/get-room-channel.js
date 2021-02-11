const { readDiographJson } = require('../lib/room-util')

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
exports.getRoomEventHandler = (event, { address }) =>
  new Promise((resolve, reject) => {
    resolve(readDiographJson(address))
  })
