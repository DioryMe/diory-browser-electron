const { ipcMain } = require('electron')
const UserDataStore = require('electron-store')
const { channels } = require('../../src/shared/constants')
const { generateDiograph } = require('../generators/diograph-generator')
const { saveRoom } = require('../lib/room-util')

ipcMain.on(channels.GENERATE_DIOGRAPH, (event, path) => {
  console.log('GENERATE_DIOGRAPH', path)
  generateDiograph(path).then(({ id, diograph }) => {
    console.log(id, diograph)
    console.log('--------')
    saveRoom(path, diograph)
      .then(() => {
        // Store current roomId to user data
        const store = new UserDataStore()
        store.set({
          roomInFocus: {
            id,
            path,
          },
        })
        console.log(id)
        console.log(diograph[id])
        event.reply(channels.GENERATE_DIOGRAPH, diograph[id])
      })
      .catch((err) => {
        console.log(err)
        return event.sender.send(channels.GENERATE_DIOGRAPH, null, err)
      })
  })
})
