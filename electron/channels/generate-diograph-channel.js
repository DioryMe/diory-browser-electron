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
export const generateDiographEventHandler = (event, path) =>
  new Promise((resolve, reject) => {
    generateDiograph(path).then(({ id, diograph }) => {
      saveRoom(path, diograph)
        .then(() => {
          resolve({
            channelName: channels.GENERATE_DIOGRAPH,
            responseObject: { id, diograph, path },
          })
        })
        .catch((err) => {
          reject({ channelName: channels.GENERATE_DIOGRAPH, errorObject: err }) // eslint-disable-line prefer-promise-reject-errors
        })
    })
  })
