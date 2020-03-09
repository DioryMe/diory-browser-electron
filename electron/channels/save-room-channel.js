const { ipcMain } = require('electron')
const { channels } = require('../../src/shared/constants')
const { saveRoom } = require('../lib/room-util')

ipcMain.on(channels.SAVE_ROOM, (event, { id, diograph }) => {
  saveRoom(id, diograph, err => {
    if(err) {
      console.log(err)
      return event.sender.send(channels.SAVE_ROOM, null, err);
    }
    event.sender.send(channels.SAVE_ROOM, true);
  })
});
