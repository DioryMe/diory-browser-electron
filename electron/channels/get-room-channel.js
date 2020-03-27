const { ipcMain } = require('electron')
const { channels } = require('../../src/shared/constants')
const { getRoom } = require('../lib/room-util')

ipcMain.on(channels.GET_ROOM, (event, path) => {
  console.log('GET_ROOM', path)
  getRoom(path).then(room => {
    console.log(JSON.stringify(room, null, 2))
    console.log('--------')
    event.sender.send(channels.GET_ROOM, room)
  })
})
