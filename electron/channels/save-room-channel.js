const { channels } = require('../../src/shared/constants')
const { saveRoom } = require('../lib/room-util')

export const saveRoomEventHandler = (event, { path, room: { id, diograph } }) => {
  saveRoom(path, diograph)
    .then(() => {
      console.log(JSON.stringify(diograph, null, 2))
      event.reply(channels.SAVE_ROOM, true)
    })
    .catch((err) => {
      console.log(err.message)
      return event.reply(channels.SAVE_ROOM, null, err)
    })
}
