const { ipcMain } = require('electron')
const { channels } = require('../../src/shared/constants')
const { getRoom } = require('../lib/room-util')

ipcMain.on(channels.GET_ROOM, (event, { address }) => {
  console.log('GET_ROOM', address)
  getRoom(address).then(({ diograph }) => {
    event.sender.send(channels.GET_ROOM, { diograph })
  })
})
