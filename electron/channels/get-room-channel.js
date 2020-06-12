// const path = require('path')
const { ipcMain } = require('electron')
const UserDataStore = require('electron-store')
const { channels } = require('../../src/shared/constants')
const { getRoom } = require('../lib/room-util')

ipcMain.on(channels.GET_ROOM, (event) => {
  console.log('Backend IPC: GET_ROOM')
  // Retrieve current roomId and path from user data
  // - if nothing found from user data fallback to default welcome-room
  const store = new UserDataStore()
  const defaultRoom = {
    id: 'welcome-room',
    // FIXME: Figure out how to allow local & binary use
    // package-* scripts want it this way...
    // NOTE: Enable require('path') on top!
    // path: path.join(__dirname, '../../default-welcome-room'),
    path: './public/default-welcome-room',
  }
  const roomInFocus = store.get('roomInFocus') || defaultRoom

  console.log('Room in focus:', roomInFocus)

  getRoom(roomInFocus.path).then((diograph) => {
    roomInFocus.diograph = diograph.diograph
    event.sender.send(channels.GET_ROOM, roomInFocus)
  })
})
