import { getRoom } from '../lib/room-util'

/**
 * Event handler for GET_ROOM channel
 * @function
 * @param event {Object} - Event from frontend via ipcMain
 * @param params {Object} - Address (=path) of the room (inside of an object `{ address: '/Users...' }`)
 * @return {Promise} Resolves with object with diograph key with diograph as Object
 *
 * @example Response object:
 * { diograph: {
 *      room1: { id: 'room1', image: '...', links: [...] },
 *      room2: { id: 'room2', image: '...', links: [...] }
 *   }
 * }
 *
 */
export const getRoomEventHandler = (event, { address }) =>
  new Promise((resolve, reject) => {
    resolve(getRoom(address))
  })
