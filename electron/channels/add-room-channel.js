const { ipcMain } = require('electron')
const { channels } = require('../../src/shared/constants')
const { generateDiograph } = require('../generators/diograph-generator')
const { saveRoom } = require('../lib/room-util')

ipcMain.on(channels.ADD_ROOM, (event, path) => {
  console.log('ADD_ROOM', path)
  generateDiograph(path).then(({ id, diograph }) => {
    console.log(id, diograph)
    console.log('--------')
    saveRoom(path, diograph)
      .then(() => {
        event.reply(channels.ADD_ROOM, diograph[id])
      })
      .catch(err => {
        console.log(err)
        return event.sender.send(channels.ADD_ROOM, null, err)
      })
  })
})
