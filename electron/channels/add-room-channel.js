const { ipcMain } = require('electron')
const { channels } = require('../../src/shared/constants')
const FolderTools = require('../lib/diograph-folder-tools')

ipcMain.on(channels.ADD_ROOM, (event, path) => {
  // DEFAULT PATH IS EXAMPLE-FOLDER PATH
  // filePath = path.join(__dirname, 'spec/example-folder')
  console.log('ADD_ROOM', path)
  FolderTools.generateRoom(path).then((room) => {
    console.log(room)
    console.log('--------')
    event.reply(channels.ADD_ROOM, room)
  })
})
