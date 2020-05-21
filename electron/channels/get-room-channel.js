const { ipcMain } = require('electron')
const UserDataStore = require('electron-store')
const { channels } = require('../../src/shared/constants')
const { getRoom } = require('../lib/room-util')

ipcMain.on(channels.GET_ROOM, (event) => {
  // Retrieve current roomId and path from user data
  // - if nothing found from user data fallback to default welcome-room
  const store = new UserDataStore()
  const defaultRoom = {
    id: 'welcome-room',
    path: './public/default-welcome-room',
  }
  const roomInFocus = store.get('roomInFocus') || defaultRoom

  console.log('GET_ROOM', roomInFocus)

  getRoom(roomInFocus.path).then((diograph) => {
    console.log(diograph)
    console.log('--------')
    roomInFocus.diograph = diograph.diograph
    event.sender.send(channels.GET_ROOM, roomInFocus)
  })
})
