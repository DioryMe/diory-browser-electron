const { ipcMain } = require('electron')
const { channels } = require('../../src/shared/constants')
const { getRoom, saveRoom } = require('../lib/room-util')
const FolderTools = require('../lib/diograph-folder-tools')

ipcMain.on(channels.CREATE_ROOM, (event, filePath) => {
  // DEFAULT PATH IS EXAMPLE-FOLDER PATH
  // filePath = path.join(__dirname, 'spec/example-folder')
  FolderTools.generateRoom(filePath).then(room => {
    getRoom(room.id).then(retrievedRoom => {
      saveRoom(retrievedRoom.id, retrievedRoom.diograph, err => {
        if(err) {
          console.log(err)
          return event.sender.send(channels.CREATE_ROOM, null, err);
        }
        event.reply(channels.CREATE_ROOM, room)
      })
    })
  })
})
