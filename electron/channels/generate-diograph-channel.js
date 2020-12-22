const { channels } = require('../../src/shared/constants')
const { generateDiograph } = require('../generators/diograph-generator')
const { saveRoom } = require('../lib/room-util')

/**
 * Event handler for GENERATE_DIOGRAPH channel
 * @function
 * @param event {Object} - Event from frontend via ipcMain
 * @param params {Object} - Path as string
 * @return {Promise} Resolves with object with id, diograph and path keys (diograph as Object)
 *
 * @example Response object:
 * {
 *   id: 'diograph123',
 *   path: '/Users/...',
 *   diograph: {
 *      room1: { id: 'room1', image: '...', links: [...] },
 *      room2: { id: 'room2', image: '...', links: [...] }
 *   }
 * }
 *
 */
export const generateDiographEventHandler = (event, path) => {
  generateDiograph(path).then(({ id, diograph }) => {
    saveRoom(path, diograph)
      .then(() => {
        event.reply(channels.GENERATE_DIOGRAPH, { id, diograph, path })
      })
      .catch((err) => {
        console.log(err)
        return event.reply(channels.GENERATE_DIOGRAPH, null, err)
      })
  })
}
