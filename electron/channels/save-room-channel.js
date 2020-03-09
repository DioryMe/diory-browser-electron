const { ipcMain } = require('electron')
const { channels } = require('../../src/shared/constants')
const { saveRoom } = require('../lib/room-util')

ipcMain.on(channels.SAVE_ROOM, (event, { id, diograph }) => {
  saveRoom(id, diograph)
    .then(() => {
      event.sender.send(channels.SAVE_ROOM, true)
    })
    .catch((err) => {
      console.log(err)
      return event.sender.send(channels.SAVE_ROOM, null, err);
    })
});
