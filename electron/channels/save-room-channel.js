const { channels } = require('../../src/shared/constants')
const { saveRoom } = require('../lib/room-util')

export const saveRoomEventHandler = (event, { path, room: { id, diograph } }) =>
  new Promise((resolve, reject) =>
    saveRoom(path, diograph).then(
      (responseObject) => {
        resolve({ channelName: channels.SAVE_ROOM, responseObject: true })
      },
      (error) => {
        reject({ channelName: channels.SAVE_ROOM, errorObject: error }) // eslint-disable-line prefer-promise-reject-errors
      }
    )
  )
