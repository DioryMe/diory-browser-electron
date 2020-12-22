import { getRoom } from '../lib/room-util'

const { channels } = require('../../src/shared/constants')

/**
 * Event handler for GET_ROOM channel
 * @function
 * @param event {Object} - Event from frontend via ipcMain
 * @param params {Object} - Uses only address key which is the folder path
 * @return {Promise} Resolves with object with diograph key with diograph as Object
 */
export const handleGetRoomEvent = (event, { address }) =>
  new Promise((resolve, reject) => {
    resolve({ channelName: channels.GET_ROOM, responseObject: getRoom(address) })
  })
