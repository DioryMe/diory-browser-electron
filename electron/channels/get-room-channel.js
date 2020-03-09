const { ipcMain } = require('electron')
const { channels } = require('../../src/shared/constants')
const { getRoom } = require('../lib/room-util')

ipcMain.on(channels.GET_ROOM, (event, id) => {
  getRoom(id).then(room => {
    console.log(room)
    event.sender.send(channels.GET_ROOM, room);
  })
});
