const { ipcMain } = require('electron')
const UserDataStore = require('electron-store')
const { channels } = require('../../src/shared/constants')
const { generateDiograph } = require('../generators/diograph-generator')
const { saveRoom } = require('../lib/room-util')

ipcMain.on(channels.GENERATE_DIOGRAPH, (event, path) => {
  console.log('GENERATE_DIOGRAPH', path)
  generateDiograph(path).then(({ roomId, diograph }) => {
    console.log(roomId, diograph)
    console.log('--------')
    saveRoom(path, diograph)
      .then(() => {
        // Store current roomId to user data
        const store = new UserDataStore()
        store.set({
          roomInFocus: {
            roomId,
            path,
          },
        })
        console.log(roomId)
        event.reply(channels.GENERATE_DIOGRAPH, diograph[roomId])
      })
      .catch((err) => {
        console.log(err)
        return event.sender.send(channels.GENERATE_DIOGRAPH, null, err)
      })
  })
})
