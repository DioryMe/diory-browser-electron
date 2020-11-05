const { ipcMain } = require('electron')
const { channels } = require('../../src/shared/constants')
const { saveRoom } = require('../lib/room-util')

ipcMain.on(channels.SAVE_ROOM, (event, { path, room: { id, diograph } }) => {
  console.log('Backend IPC: SAVE_ROOM', path, id)

  saveRoom(path, diograph)
    .then(() => {
      console.log(JSON.stringify(diograph, null, 2))
      event.reply(channels.SAVE_ROOM, true)
    })
    .catch((err) => {
      console.log(err)
      return event.reply(channels.SAVE_ROOM, null, err)
    })
})
