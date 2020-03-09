const { ipcMain } = require('electron')
const { channels } = require('../../src/shared/constants')
const FolderTools = require('../lib/diograph-folder-tools')

ipcMain.on(channels.CREATE_ROOM, (event, filePath) => {
  // DEFAULT PATH IS EXAMPLE-FOLDER PATH
  // filePath = path.join(__dirname, 'spec/example-folder')
  FolderTools.generateRoom(filePath).then(room => {
    event.reply(channels.CREATE_ROOM, room)
  })
})
